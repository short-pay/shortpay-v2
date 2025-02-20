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

import { createFunnel } from './http/routes/funnels/create-funnel'
import { getFunnels } from './http/routes/funnels/get-funnels'
import { getFunnel } from './http/routes/funnels/get-funnel'
import { createFunnelPage } from './http/routes/funnel-pages/create-funnel-page'
import { getFunnelPages } from './http/routes/funnel-pages/get-funnels-pages'
import { deleteFunnelPages } from './http/routes/funnel-pages/delete-funnel-pages'
import { getFunnelPage } from './http/routes/funnel-pages/get-funnel-page'
import { createNotification } from './http/routes/notification/create-notification'

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
