import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { getGateway } from '@/integrations/gateways/gateway-factory'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function createTransaction(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/transactions',
    {
      schema: {
        tags: ['Transactions'],
        summary: 'Create a new transaction',
        body: z.object({
          provider: z.string(), // Nome do provider (ex.: orbitaPayV2Provider)
          method: z.enum(['pix', 'credit_card', 'boleto']),
          amount: z.number(),
          currency: z.string().default('BRL'),
          description: z.string(),
          cardToken: z.string().optional(), // Necessário apenas para credit_card
          installments: z.number().optional(), // Necessário apenas para credit_card
          customer: z.object({
            email: z.string().email(),
            name: z.string(),
          }),
        }),
      },
    },
    async (request, reply) => {
      const {
        provider,
        method,
        amount,
        currency,
        description,
        cardToken,
        installments,
        customer,
      } = request.body

      try {
        // 1. Instanciar o provider correto usando a fábrica
        const gateway = getGateway(provider)

        // 2. Criar a transação
        const transaction = await gateway.createTransaction({
          amount,
          currency,
          description,
          method,
          cardToken,
          installments,
          customer,
        })

        return reply.status(201).send(transaction)
      } catch (error) {
        console.error('Error creating transaction:', error)
        return reply.status(400).send({ error: 'Failed to create transaction' })
      }
    },
  )
}
