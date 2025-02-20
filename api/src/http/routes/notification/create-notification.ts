import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { auth } from '@/http/middlewares/auth'
import { BadRequestError } from '@/http/_errors/bad-request-error'

export async function createNotification(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/notifications',
      {
        schema: {
          tags: ['Notification'],
          summary: 'Create a new Notification',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          body: z.object({
            type: z.string(),
            message: z.string(),
            funnelId: z.string().nullable()
          }),
          response: {
            201: z.object({
              notificationId: z.string().uuid(),
            }),
          },
        },
      },
      async (request) => {

        const { slug } = request.params
        const { type, message, funnelId } = request.body
        const { organization } = await request.getUserMembership(slug)

        if (!organization) {
          throw new BadRequestError('User is not part of the organization or does not exist.')
        }
        
        if (funnelId) {
          const funnelExists = await prisma.funnel.findUnique({
            where: { id: funnelId },
          })
        
          if (!funnelExists) {
            throw new BadRequestError('Invalid funnel ID.')
          }
        }

        const notification = await prisma.notification.create({
          data: {
          message: message,
          type,
          isRead: false,
          funnelId: funnelId,
          organizationId: organization.id
          }
        })

        return { notificationId: notification.id }
      },
    )
}
