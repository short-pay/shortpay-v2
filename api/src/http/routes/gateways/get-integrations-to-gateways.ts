import { UnauthorizedError } from '@/http/_errors/unauthorized-error'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { gateways } from '@/utils/gateways'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function GetIntegrationsToGateways(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/gateways/:slug',
      {
        schema: {
          tags: ['Gateways'],
          summary:
            'List all gateways (available and connected) for an organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string().min(1, 'Organization slug is required'),
          }),
          querystring: z.object({
            search: z.string().optional(),
            status: z.enum(['connected', 'disconnected']).optional(),
          }),
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
        const { slug } = request.params
        const { search, status } = request.query

        // Fetch the organization by slug
        const organization = await prisma.organization.findFirstOrThrow({
          where: { slug },
          select: { id: true, slug: true },
        })

        // Verify that the user has access to this organization
        const isMember = await prisma.organization.findFirst({
          where: {
            id: organization.id,
            members: { some: { userId } },
          },
        })

        if (!isMember) {
          throw new UnauthorizedError('Access denied')
        }

        // Fetch connected gateways for the organization
        const connectedConfigs = await prisma.gatewayConfig.findMany({
          where: { organizationId: organization.id },
          select: { provider: true },
        })

        const connectedProviders = connectedConfigs.map(
          (config) => config.provider,
        )

        // Map gateways and apply filters
        let result = gateways.map((gateway) => ({
          ...gateway,
          isConnected: connectedProviders.includes(gateway.provider),
        }))

        if (search) {
          result = result.filter((gateway) =>
            gateway.name.toLowerCase().includes(search.toLowerCase()),
          )
        }

        if (status === 'connected') {
          result = result.filter((gateway) => gateway.isConnected)
        } else if (status === 'disconnected') {
          result = result.filter((gateway) => !gateway.isConnected)
        }

        // Return the filtered results
        return reply.status(200).send({ gateways: result })
      },
    )
}
