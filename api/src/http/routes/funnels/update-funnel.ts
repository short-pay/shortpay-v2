import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function updateFunnel(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/funnels/:id/update',
      {
        schema: {
          tags: ['Funnels'],
          summary: 'Update funnel details',
          params: z.object({
            id: z.string().uuid('Invalid funnel ID format'),
          }),
          body: z.object({
            name: z.string().optional(),
            description: z.string().optional(),
            pages: z
              .array(
                z.object({
                  id: z.string().optional(),
                  name: z.string(),
                  type: z.enum([
                    'GENERIC',
                    'CHECKOUT',
                    'LANDING_PAGE',
                    'THANK_YOU',
                  ]),
                  content: z.any(),
                }),
              )
              .optional(),
          }),
          response: {
            200: z.object({
              id: z.string(),
              name: z.string(),
              description: z.string().nullable(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params
        const { name, description, pages } = request.body

        const updatedFunnel = await prisma.funnel.update({
          where: { id },
          data: {
            name,
            description,
            pages: pages
              ? {
                  upsert: pages.map((page) => ({
                    where: { id: page.id || '' },
                    update: {
                      name: page.name,
                      type: page.type,
                      content: page.content,
                      path: `${page.name.toLowerCase().replace(/\s+/g, '-')}`,
                    },
                    create: {
                      name: page.name,
                      type: page.type,
                      content: page.content,
                      path: `${page.name.toLowerCase().replace(/\s+/g, '-')}`,
                    },
                  })),
                }
              : undefined,
          },
        })

        return reply.status(200).send(updatedFunnel)
      },
    )
}
