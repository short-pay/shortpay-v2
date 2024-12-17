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
            provider: z.string(), // Nome do provedor (ex.: Stripe, Órbita)
            description: z.string().optional(), // Descrição opcional
            apiKey: z.string().default('x'), // Chave API
            secretKey: z.string(), // Chave secreta
            publicKey: z.string().nullable(), // Chave pública opcional
            webhookSecret: z.string().nullable(), // Segredo do webhook opcional
            installmentFee: z.number().min(0).max(100).optional(), // Taxa de parcelamento (0-100%)
          }),
          response: {
            201: z.object({
              id: z.string().uuid(),
              provider: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
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

        // Verifica se a organização existe
        const organization = await prisma.organization.findUnique({
          where: { slug },
        })

        if (!organization) {
          throw new NotFoundError('Organization not Found')
        }

        // Verifica permissões do usuário
        await ensureIsAdminOrOwner(userId, organization.id)

        // Criptografa informações sensíveis
        const encryptedApiKey = encrypt(apiKey)
        const encryptedSecretKey = encrypt(secretKey)
        const encryptedWebhookSecret = webhookSecret
          ? encrypt(webhookSecret)
          : null

        // Cria o registro no banco de dados
        const gateway = await prisma.gatewayConfig.create({
          data: {
            organizationId: organization.id,
            provider,
            description,
            apiKey: encryptedApiKey,
            secretKey: encryptedSecretKey,
            publicKey,
            webhookSecret: encryptedWebhookSecret,
            installmentFee,
          },
        })

        return reply.status(201).send({
          id: gateway.id,
          provider: gateway.provider,
        })
      },
    )
}
