import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { gateways } from '@/utils/gateways'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function getIntegrationsToGateways(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/gateways',
      {
        schema: {
          tags: ['Gateways'],
          summary: 'List all gateways and user connections',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              gateways: z.array(
                z.object({
                  name: z.string(),
                  provider: z.string(),
                  description: z.string(),
                  icon: z.string(),
                  domain: z.string(),
                  isGlobal: z.boolean(),
                  isConnected: z.boolean(),
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const organization = await prisma.organization.findFirstOrThrow({
          where: {
            members: {
              some: {
                userId,
              },
            },
          },
          select: { id: true },
        })

        const connectedConfigs = await prisma.gatewayConfig.findMany({
          where: {
            organizationId: organization.id,
          },
          select: {
            provider: true,
          },
        })

        const connectedProviders = connectedConfigs.map(
          (config) => config.provider,
        )

        const result = gateways.map((gateway) => ({
          ...gateway,
          isConnected: connectedProviders.includes(gateway.provider),
        }))

        return reply.status(200).send({
          gateways: result,
        })
      },
    )
}
