import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function deleteCheckout(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/checkouts/:id',
      {
        schema: {
          tags: ['Checkouts'],
          summary: 'Delete a specific checkout',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().uuid('Invalid checkout ID format'),
          }),
        },
      },
      async (request, reply) => {
        const { id } = request.params

        const deletedCheckout = await prisma.checkout.delete({
          where: { id },
        })

        if (!deletedCheckout) {
          return reply.status(404).send({ message: 'Checkout not found.' })
        }

        return reply.status(204).send()
      },
    )
}
