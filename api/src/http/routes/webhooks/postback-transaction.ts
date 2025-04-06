import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function postbackTransaction(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/webhooks/transactions',
    {
      schema: {
        tags: ['Webhooks'],
        summary: 'Receive transaction postback updates',
        body: z.object({
          id: z.number(),
          status: z.enum([
            'processing',
            'authorized',
            'paid',
            'refunded',
            'waiting_payment',
            'refused',
            'chargedback',
            'canceled',
            'in_protest',
            'partially_paid',
          ]),
          amount: z.number(),
          updatedAt: z.string(),
          paymentMethod: z.string(),
          customer: z.object({
            name: z.string(),
            email: z.string(),
          }),
        }),
      },
    },
    async (request, reply) => {
      const { id, status, updatedAt } = request.body

      try {
        console.log('🔔 Postback received:', request.body)

        const transaction = await prisma.gatewayTransaction.findFirst({
          where: { transactionId: id.toString() },
        })

        if (!transaction) {
          return reply.status(404).send({ message: 'Transaction not found.' })
        }

        // Atualiza a transação no banco
        await prisma.gatewayTransaction.update({
          where: { id: transaction.id },
          data: {
            status,
            updatedAt: new Date(updatedAt),
          },
        })

        console.log(`✅ Transaction ${id} updated to ${status}.`)

        return reply
          .status(200)
          .send({ message: 'Postback processed successfully.' })
      } catch (error: any) {
        console.error('❌ Failed to process postback:', error)
        return reply.status(500).send({ message: 'Internal server error.' })
      }
    },
  )
}
