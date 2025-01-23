import { NotFoundError } from '@/http/_errors/not-found-error'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function cloneFunnel(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/funnels/:id/clone',
      {
        schema: {
          tags: ['Funnels'],
          summary: 'Clone a funnel',
          params: z.object({
            id: z.string().uuid('Invalid funnel ID format'),
          }),
          response: {
            201: z.object({
              id: z.string(),
              name: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params

        const funnel = await prisma.funnel.findUnique({
          where: { id },
          include: { pages: true },
        })

        if (!funnel) {
          throw new NotFoundError()
        }

        const clonedFunnel = await prisma.funnel.create({
          data: {
            name: `${funnel.name} (Copy)`,
            description: funnel.description,
            organizationId: funnel.organizationId,
            pages: {
              create: funnel.pages.map((page) => ({
                name: page.name,
                type: page.type,
                content: page.content as Prisma.InputJsonValue, // Converte para o tipo esperado
                path: `${page.path}-copy`,
              })),
            },
          },
        })

        return reply.status(201).send({
          id: clonedFunnel.id,
          name: clonedFunnel.name,
        })
      },
    )
}
