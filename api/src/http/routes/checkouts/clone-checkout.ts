import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function cloneCheckout(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/checkouts/:id/clone',
      {
        schema: {
          tags: ['Checkouts'],
          summary: 'Clone an existing checkout',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().uuid('Invalid checkout ID format'),
          }),
        },
      },
      async (request, reply) => {
        const { id } = request.params

        const existingCheckout = await prisma.checkout.findUnique({
          where: { id },
        })

        if (!existingCheckout) {
          return reply.status(404).send({ message: 'Checkout not found.' })
        }

        const clonedCheckout = await prisma.checkout.create({
          data: {
            name: `${existingCheckout.name} (Clone)`,
            description: existingCheckout.description,
            content: existingCheckout.content || {}, // Garante um objeto vazio se `null`
            currency: existingCheckout.currency,
            convertedCurrency: existingCheckout.convertedCurrency,
            convertedAmount: existingCheckout.convertedAmount,
            organizationId: existingCheckout.organizationId,
            funnelId: existingCheckout.funnelId,
          },
        })

        return reply.status(201).send(clonedCheckout)
      },
    )
}
