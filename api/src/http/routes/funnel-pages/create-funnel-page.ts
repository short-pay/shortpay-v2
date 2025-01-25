import { prisma } from '@/lib/prisma'
import { auth } from '@/http/middlewares/auth'
import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { NotFoundError } from '@/http/_errors/not-found-error'

export async function createFunnelPageRoute(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/funnels/:funnelId/pages',
      {
        schema: {
          tags: ['Funnel Pages'],
          summary: 'Create a new page for a funnel',
          params: z.object({
            funnelId: z.string().uuid('Invalid funnel ID format'),
          }),
          body: z.object({
            name: z
              .string()
              .min(3, 'The page name must have at least 3 characters.'),
            type: z.enum(['GENERIC', 'CHECKOUT', 'LANDING_PAGE', 'THANK_YOU']),
            content: z.any().optional(),
            order: z
              .number()
              .min(0, 'The order must be greater than or equal to 0.'),
          }),
          response: {
            201: z.object({
              id: z.string(),
              name: z.string(),
              type: z.string(),
              order: z.number(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { funnelId } = request.params
        const { name, type, content, order } = request.body

        console.log(request.body, 'body api')

        // Check if the funnel exists
        const funnel = await prisma.funnel.findUnique({
          where: { id: funnelId },
        })

        if (!funnel) {
         throw new NotFoundError()
        }

        console.log(funnel, 'body api')


        const page = await prisma.funnelPage.create({
          data: {
            funnelId,
            name,
            type,
            content,
            order,
            pathName: `${name.toLowerCase().replace(/\s+/g, '-')}`,
            path: `${funnelId}/${name.toLowerCase().replace(/\s+/g, '-')}`, // Adicione o campo path
          },
        })


        console.log(page, 'body api')


        return reply.status(201).send({
          id: page.id,
          name: page.name,
          type: page.type,
          order: page.order,
        })
      },
    )
}