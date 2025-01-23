import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getFunnels(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/funnels/:slug',
      {
        schema: {
          tags: ['Funnels'],
          summary:
            'List all funnels for an organization with pagination and filters',
          params: z.object({
            slug: z.string(),
          }),
          querystring: z.object({
            page: z.coerce.number().default(1),
            size: z.coerce.number().default(10),
            searchTerm: z.string().optional(),
          }),
          response: {
            200: z.object({
              funnels: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  description: z.string().nullable(),
                  published: z.boolean(),
                }),
              ),
              totalPages: z.number(),
              totalItems: z.number(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const { page, size, searchTerm } = request.query

        const { organization } = await request.getUserMembership(slug)
        const organizationId = organization.id

        const whereClause = {
          organizationId,
          ...(searchTerm && {
            name: {
              contains: searchTerm,
              mode: Prisma.QueryMode.insensitive,
            },
          }),
        } as const

        const [funnels, totalItems] = await Promise.all([
          prisma.funnel.findMany({
            where: whereClause,
            skip: (page - 1) * size,
            take: size,
            orderBy: {
              createdAt: 'desc',
            },
          }),
          prisma.funnel.count({ where: whereClause }),
        ])

        const totalPages = Math.ceil(totalItems / size)

        return reply.status(200).send({
          funnels,
          totalPages,
          totalItems,
        })
      },
    )
}
