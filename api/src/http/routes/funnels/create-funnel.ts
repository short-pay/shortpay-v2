import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { NotFoundError } from '@/http/_errors/not-found-error'
import { auth } from '@/http/middlewares/auth'

export async function createFunnel(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/funnels/:org',
      {
        schema: {
          tags: ['Funnels'],
          summary: 'Create a new funnel',
          params: z.object({
            org: z.string(),
          }),
          body: z.object({
            name: z.string().min(1, 'Name is required'),
            description: z.string().optional(),
            pages: z
              .array(
                z.object({
                  name: z.string(),
                  type: z.enum(['GENERIC', 'CHECKOUT', 'LANDING_PAGE', 'THANK_YOU']),
                  content: z.any().default([]),
                }),
              )
              .default([]),
          }),
          response: {
            201: z.object({
              id: z.string(),
              name: z.string(),
              description: z.string().nullable(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { org } = request.params
        const { organization } = await request.getUserMembership(org)
    
        if (!organization) {
          throw new NotFoundError('Organization not found.')
        }
    
        const { name, description, pages } = request.body
    
        const funnel = await prisma.funnel.create({
          data: {
            name,
            description,
            organizationId: organization.id,
            pages: {
              create: pages.map((page, index) => ({
                name: page.name,
                type: page.type,
                content: page.content || {},
                path: `${name.toLowerCase()}-${page.name.toLowerCase()}`,
                order: index + 1,
              })),
            },
          },
        })
    
        return reply.status(201).send({
          id: funnel.id,
          name: funnel.name,
          description: funnel.description,
        })
      },
    )
}
