import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function getProducts(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/products/:slug',
      {
        schema: {
          tags: ['Products'],
          summary: 'List all products for an organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
           200: z.object({
            products: z.array(
              z.object({
                name: z.string(),
                id: z.string(),
                currency: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
                organizationId: z.string(),
                description: z.string().nullable(),
                price: z.number(),
                imageUrls: z.array(z.string()),
                checkoutId: z.string().nullable(),
              })
            )
           }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const { organization } = await request.getUserMembership(slug)

        const organizationId = organization.id

        const products = await prisma.product.findMany({
          where: { organizationId },
        })

        console.log(products)

        return reply.status(200).send({products})
      },
    )
}
