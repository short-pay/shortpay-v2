import fastify from 'fastify'
import { errorHandler } from './http/middlewares/error-handler'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { fastifyRawBody } from 'fastify-raw-body'
import fastifyCors from '@fastify/cors'
import { registerAuthRoutes } from './http/routes/auth'
import { registerOrganizationRoutes } from './http/routes/orgs'
import { registerGatewaysRoutes } from './http/routes/gateways'
import { registerProductRoutes } from './http/routes/products'
import { registerTransactionRoutes } from './http/routes/transactions'
import { registerCheckoutRoutes } from './http/routes/checkouts'
import { registerFunnelsRoutes } from './http/routes/funnels'
import { registerFunnelPageRoutes } from './http/routes/funnel-pages'
import { registerWebhookRoutes } from './http/routes/webhooks'
import { registerInviteRoutes } from './http/routes/invites'
import { registerMembersRoutes } from './http/routes/members'

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
registerAuthRoutes(app)

// Organizations
registerOrganizationRoutes(app)

// Gateways
registerGatewaysRoutes(app)

// Products
registerProductRoutes(app)

// Transactions
registerTransactionRoutes(app)

// Checkouts
registerCheckoutRoutes(app)

// Funnels
registerFunnelsRoutes(app)

// Funnels Page
registerFunnelPageRoutes(app)

// Webhooks
registerWebhookRoutes(app)

// Invites
// registerInviteRoutes(app)

// Members
// registerMembersRoutes(app)

// Billing
// app.register(getOrganizationBilling)
