import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { decrypt } from '@/utils/crypto/crypto-utils'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { PaymentMethodFactory } from '@/integrations/methods/method.factory'
import { PaymentProviderFactory } from '@/integrations/providers/provider.factory'

export async function createTransaction(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/transactions',
    {
      schema: {
        tags: ['Transactions'],
        summary: 'Create a new transaction',
        body: z.object({
          checkoutId: z.string(),
          productId: z.string(),
          paymentMethod: z.string(), // "pix", "credit_card", "boleto"
          customer: z.object({
            document: z.object({
              number: z.string().min(11, 'Invalid document format.'),
              type: z.string().default('cpf'),
            }),
            name: z.string(),
            email: z.string().email(),
            phone: z.string(),
            externalRef: z.string().optional(),
          }),
          extraData: z.object({}).passthrough().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { checkoutId, productId, paymentMethod, customer, extraData } =
        request.body

      try {
        const checkout = await prisma.checkout.findUnique({
          where: { id: checkoutId },
        })
        if (!checkout) throw new Error('Checkout not found.')

        const product = await prisma.product.findUnique({
          where: { id: productId },
        })
        if (!product) throw new Error('Product not found.')

        const gatewayConfig = await prisma.gatewayConfig.findFirst({
          where: {
            organizationId: checkout.organizationId,
            provider: checkout.gatewayProvider ?? '', // ex: 'orbitapay'
          },
        })
        if (!gatewayConfig) throw new Error('Gateway configuration not found.')

        const secretKey = decrypt(gatewayConfig.secretKey)
        const apiKey = decrypt(gatewayConfig.apiKey)

        // Cria o PaymentMethod (ex: Pix, Cartão, Boleto)
        const method = PaymentMethodFactory.create(paymentMethod)


        // Cria o Provider (ex: OrbitaPay, Stripe)
        const provider = PaymentProviderFactory.create(
          gatewayConfig.provider,
          gatewayConfig.endpoint,
          {secret_key: secretKey, api_key: apiKey},
        )

        // Monta o payload base
        let payload = {
          customer,
          amount: product.price * 100,
          paymentMethod,
          items: [
            {
              tangible: true,
              title: product.name,
              unitPrice: product.price * 100,
              quantity: 1,
              externalRef: `item-${product.id}`,
            },
          ],
          postbackUrl: 'https://example.com/webhooks/transactions',
          ...extraData,
        }

        // Prepara o payload de acordo com o método de pagamento
        payload = method.preparePayload(payload)

        // Processa a transação com o provider
        const transactionData = await provider.processTransaction(payload)

        return reply.status(201).send(transactionData)
      } catch (error: any) {
        console.error('Error creating transaction:', error)
        return reply.status(500).send({
          message: 'Failed to create transaction.',
          error: error.message,
        })
      }
    },
  )
}
