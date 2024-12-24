import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { ensureIsAdminOrOwner } from '@/utils/permissions'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function UpdateIntegrationToGateway(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/gateways/:id',

      {
        schema: {
          tags: ['Gateways'],
          summary: 'Update a payment gateway',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().uuid(),
          }),
          body: z.object({
            provider: z.string(), // Nome do provedor (ex.: Stripe, Órbita)
            description: z.string().optional(), // Descrição opcional
            apiKey: z.string().default('x'), // Chave API
            secretKey: z.string(), // Chave secreta
            publicKey: z.string().nullable(), // Chave pública opcional
            webhookSecret: z.string().nullable(), // Segredo do webhook opcional
            installmentFee: z.number().min(0).max(100).optional(), // Taxa de parcelamento (0-100%)
          }),
          response: {
            204: z.null(),
          },
        },
      },

      async (request, reply) => {
        const { id } = request.params

        const userId = await request.getCurrentUserId()

        const {
          provider,
          description,
          apiKey,
          secretKey,
          publicKey,
          webhookSecret,
          installmentFee,
        } = request.body

        const gateway = await prisma.gatewayConfig.findUniqueOrThrow({
          where: { id },
        })

        await ensureIsAdminOrOwner(userId, gateway.organizationId)

        await prisma.gatewayConfig.update({
          where: { id },
          data: {
            provider,
            description,
            apiKey,
            secretKey,
            publicKey,
            webhookSecret,
            installmentFee,
          },
        })

        return reply.status(204).send()
      },
    )
}
