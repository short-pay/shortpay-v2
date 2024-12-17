import { NotFoundError } from '@/http/_errors/not-found-error'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function deleteProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/products/:id',
    {
      schema: {
        tags: ['Products'],
        summary: 'Delete a product',
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const product = await prisma.product.findUnique({
        where: { id },
      })

      if (!product) {
        throw new NotFoundError('Product not found.')
      }

      await prisma.product.delete({
        where: { id },
      })

      return reply.status(204).send()
    },
  )
}
