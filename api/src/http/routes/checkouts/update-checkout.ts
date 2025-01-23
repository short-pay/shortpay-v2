import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function updateCheckout(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/checkouts/:id',
      {
        schema: {
          tags: ['Checkouts'],
          summary: 'Update checkout details',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().uuid('Invalid checkout ID format'),
          }),
          body: z.object({
            name: z.string().optional(),
            description: z.string().optional(),
            theme: z.string().optional(),
            content: z
              .array(z.object({ id: z.string(), type: z.string() }))
              .optional(),
            currency: z.string().optional(),
            amount: z.number().positive().optional(),
          }),
        },
      },
      async (request, reply) => {
        const { id } = request.params
        const data = request.body

        const updatedCheckout = await prisma.checkout.update({
          where: { id },
          data,
        })

        if (!updatedCheckout) {
          return reply.status(404).send({ message: 'Checkout not found.' })
        }

        return reply.status(200).send(updatedCheckout)
      },
    )
}
