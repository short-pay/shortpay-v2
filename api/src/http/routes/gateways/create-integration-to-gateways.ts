import { NotFoundError } from '@/http/_errors/not-found-error'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { ensureIsAdminOrOwner } from '@/utils/permissions'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { encrypt } from '@/utils/crypto/crypto-utils'

export async function CreateIntegrationToGateway(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/gateways/:slug',
      {
        schema: {
          tags: ['Gateways'],
          summary: 'Create Integration with a Gateway',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          body: z.object({
            provider: z.string().min(1, 'Provider is required'),
            description: z.string().optional(),
            apiKey: z.string().min(1, 'API key is required'),
            secretKey: z.string().min(1, 'Secret key is required'),
            publicKey: z.string().nullable(),
            webhookSecret: z.string().nullable(),
            installmentFee: z.number().min(0).max(100).optional(),
          }),
          response: {
            201: z.object({
              id: z.string().uuid(),
              provider: z.string(),
            }),
            500: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        console.log('🔍 Request Params:', request.params)
        console.log('🔍 Request Body:', request.body)

        const {
          provider,
          description,
          apiKey,
          secretKey,
          publicKey,
          webhookSecret,
          installmentFee,
        } = request.body

        const { slug } = request.params
        const userId = await request.getCurrentUserId()

        console.log('🆔 User ID:', userId)
        console.log('🔑 Slug:', slug)

        const organization = await prisma.organization.findUnique({
          where: { slug },
        })

        console.log('🏢 Found Organization:', organization)

        if (!organization) {
          console.log('⚠️ Organization not found for slug:', slug)
          throw new NotFoundError('Organization not Found')
        }

        await ensureIsAdminOrOwner(userId, organization.id)

        // Encrypt sensitive data
        const encryptedApiKey = encrypt(apiKey)
        const encryptedSecretKey = encrypt(secretKey)
        const encryptedPublicKey = publicKey ? encrypt(publicKey) : null
        const encryptedWebhookSecret = webhookSecret
          ? encrypt(webhookSecret)
          : null

        console.log('🔐 Encrypted Data:', {
          apiKey: encryptedApiKey,
          secretKey: encryptedSecretKey,
          publicKey: encryptedPublicKey,
          webhookSecret: encryptedWebhookSecret,
        })

        try {
          console.log('📦 Preparing data to send to Prisma...')

          const gateway = await prisma.gatewayConfig.create({
            data: {
              organizationId: organization.id,
              provider,
              description,
              apiKey: encryptedApiKey,
              secretKey: encryptedSecretKey,
              publicKey: encryptedPublicKey,
              webhookSecret: encryptedWebhookSecret,
              installmentFee,
            },
          })
          console.log('✅ Prisma Insert Success:', gateway)

          return reply.status(201).send({
            id: gateway.id,
            provider: gateway.provider,
          })
        } catch (error) {
          console.error('❌ Prisma Insert Error:', error)

          return reply.status(500).send({
            message: 'Failed to create GatewayConfig.',
          })
        }
      },
    )
}
