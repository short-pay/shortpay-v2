import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { ensureIsAdminOrOwner } from '@/utils/permissions'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function DeleteIntegrationToCheckout(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/gateways/:id',
      {
        schema: {
          tags: ['Gateways'],
          summary: 'Remove a payment gateway',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params

        const userId = await request.getCurrentUserId()

        const gateway = await prisma.gatewayConfig.findUniqueOrThrow({
          where: { id },
        })

        await ensureIsAdminOrOwner(userId, gateway.organizationId)

        await prisma.gatewayConfig.delete({
          where: {
            id,
          },
        })
        return reply.status(204).send()
      },
    )
}
