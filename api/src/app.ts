import fastify from 'fastify'

import { errorHandler } from './http/middlewares/error-handler'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { authenticateWithPassword } from './http/routes/auth/authenticate-with-password'
import { createAccount } from './http/routes/auth/create-account'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { getProfile } from './http/routes/auth/get-profile'
import { createOrganization } from './http/routes/orgs/create-organization'
import { getOrganization } from './http/routes/orgs/get-organization'
import { getOrganizations } from './http/routes/orgs/get-organizations'
import { shutdownOrganization } from './http/routes/orgs/shutdown-organization'
import { transferOrganization } from './http/routes/orgs/transfer-organization'
import { updateOrganization } from './http/routes/orgs/update-organization'
import { getMembership } from './http/routes/orgs/get-membership'
import { createProduct } from './http/routes/products/create-product'
import { deleteProduct } from './http/routes/products/delete-product'
import { getProduct } from './http/routes/products/get-product'
import { getProducts } from './http/routes/products/get-products'
import { updateProduct } from './http/routes/products/update-product'
import { CreateIntegrationToGateway } from './http/routes/gateways/create-integration-to-gateways'
import { DeleteIntegrationToCheckout } from './http/routes/gateways/delete-integration-to-checkout'
import { UpdateIntegrationToGateway } from './http/routes/gateways/update-integration-to-gateway'
import { createTransaction } from './http/routes/transactions/create-transaction'
import { requestPasswordRecover } from './http/routes/auth/request-password-recover'
import { resetPassword } from './http/routes/auth/reset-password'
import { fastifyRawBody } from 'fastify-raw-body'
import { createCheckout } from './http/routes/checkouts/create-checkout'
import { postbackTransaction } from './http/routes/webhooks/postback-transaction'
import { GetIntegrationsToGateways } from './http/routes/gateways/get-integrations-to-gateways'
import { getCheckout } from './http/routes/checkouts/get-checkout'
import { listCheckouts } from './http/routes/checkouts/list-checkouts'
import fastifyCors from '@fastify/cors'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

// Plugins
app.register(fastifyRawBody, { field: 'rawBody', runFirst: true })

app.register(fastifyCors)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS',
      description: 'Full-stack SaaS with multi-tenant & RBAC.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// Configurações globais
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(errorHandler)

// Auth
app.register(createAccount)
app.register(authenticateWithPassword)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)

// Organizations
app.register(createOrganization)
app.register(getOrganizations)
app.register(getOrganization)
app.register(shutdownOrganization)
app.register(transferOrganization)
app.register(updateOrganization)
app.register(getMembership)

// Gateways
app.register(CreateIntegrationToGateway)
app.register(DeleteIntegrationToCheckout)
app.register(UpdateIntegrationToGateway)
app.register(GetIntegrationsToGateways)

// Products
app.register(createProduct)
app.register(deleteProduct)
app.register(getProduct)
app.register(getProducts)
app.register(updateProduct)

// Invites
// app.register(acceptInvite)
// app.register(createInvite)
// app.register(getInvite)
// app.register(getInvites)
// app.register(getPendingInvites)
// app.register(rejectInvite)
// app.register(revokeInvite)

// Members
// app.register(getMembers)
// app.register(removeMember)
// app.register(updateMember)

// Transactions
app.register(createTransaction)

// Checkouts
app.register(createCheckout)
app.register(listCheckouts)
app.register(getCheckout)

// Webhooks
app.register(postbackTransaction)

// Billing
// app.register(getOrganizationBilling)
