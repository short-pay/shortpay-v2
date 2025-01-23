import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function publishCheckout(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/checkouts/:id/publish',
      {
        schema: {
          tags: ['Checkouts'],
          summary: 'Publish or unpublish a checkout',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().uuid('Invalid checkout ID format'),
          }),
          body: z.object({
            isPublished: z.boolean(),
          }),
        },
      },
      async (request, reply) => {
        const { id } = request.params
        const { isPublished } = request.body

        const updatedCheckout = await prisma.checkout.update({
          where: { id },
          data: { published: isPublished },
        })

        if (!updatedCheckout) {
          return reply.status(404).send({ message: 'Checkout not found.' })
        }

        return reply.status(200).send(updatedCheckout)
      },
    )
}
