import { prisma } from '@/lib/prisma'
import { auth } from '@/http/middlewares/auth'
import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { NotFoundError } from '@/http/_errors/not-found-error'

export async function updateFunnelPageRoute(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/funnels/:funnelId/pages/:pageId',
      {
        schema: {
          tags: ['Funnel Pages'],
          summary: 'Update a page for a funnel',
          params: z.object({
            funnelId: z.string().uuid('Invalid funnel ID format'),
            pageId: z.string().uuid('Invalid page ID format'),
          }),
          body: z.object({
            name: z
              .string()
              .min(3, 'The page name must have at least 3 characters.')
              .optional(),
            type: z
              .enum(['GENERIC', 'CHECKOUT', 'LANDING_PAGE', 'THANK_YOU'])
              .optional(),
            content: z.any().optional(),
            order: z.number().min(0).optional(),
          }),
          response: {
            200: z.object({
              id: z.string(),
              name: z.string(),
              type: z.string(),
              order: z.number(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { funnelId, pageId } = request.params
        const { name, type, content, order } = request.body

        // Validate the page existence
        const page = await prisma.funnelPage.findFirst({
          where: { id: pageId, funnelId },
        })

        if (!page) {
         throw new NotFoundError()
        }

        // Update the page
        const updatedPage = await prisma.funnelPage.update({
          where: { id: pageId },
          data: {
            name,
            type,
            content,
            order,
          },
        })

        return reply.status(200).send({
          id: updatedPage.id,
          name: updatedPage.name,
          type: updatedPage.type,
          order: updatedPage.order,
        })
      },
    )
}