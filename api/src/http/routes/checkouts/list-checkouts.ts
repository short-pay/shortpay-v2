import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function listCheckouts(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/checkouts',
      {
        schema: {
          tags: ['Checkouts'],
          summary: 'List all checkouts of a specific organization by slug',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string().min(1, 'Slug is required'),
          }),
          response: {
            200: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                description: z.string().nullable(),
                content: z.any(), // Ajustado para aceitar `JsonValue`
                currency: z.string(),
                convertedAmount: z.number().nullable(),
                createdAt: z.string(),
                updatedAt: z.string(),
                previewImage: z.string().nullable(),
                published: z.boolean(),
              }),
            ),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params

        const organization = await prisma.organization.findUnique({
          where: { slug },
        })

        if (!organization) {
          return reply.status(404).send({ message: 'Organization not found.' })
        }

        const checkouts = await prisma.checkout.findMany({
          where: { organizationId: organization.id },
          orderBy: { createdAt: 'desc' },
        })

        const formattedCheckouts = checkouts.map((checkout) => ({
          ...checkout,
          createdAt: checkout.createdAt.toISOString(),
          updatedAt: checkout.updatedAt.toISOString(),
        }))

        return reply.status(200).send(formattedCheckouts)
      },
    )
}
