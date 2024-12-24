import { NotFoundError } from '@/http/_errors/not-found-error'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function updateProduct(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/products/:id',
      {
        schema: {
          tags: ['Products'],
          summary: 'Update a product',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().uuid(),
          }),
          body: z.object({
            name: z.string().optional(),
            description: z.string().optional(),
            price: z.number().positive().optional(),
            currency: z.enum(['BRL', 'USD', 'EUR']).optional(),
            imageUrls: z.array(z.string()).optional(),
          }),
        },
      },
      async (request, reply) => {
        const { id } = request.params
        const { name, description, price, currency, imageUrls } = request.body

        const product = await prisma.product.findUnique({
          where: { id },
        })

        if (!product) {
          throw new NotFoundError('Product not found.')
        }

        const updatedProduct = await prisma.product.update({
          where: { id },
          data: {
            name,
            description,
            price,
            currency,
            imageUrls,
          },
        })

        return reply.status(200).send(updatedProduct)
      },
    )
}
