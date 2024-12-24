// import type { FastifyInstance } from 'fastify'

// import { auth } from '@/http/middlewares/auth'
// import z from 'zod'
// import type { ZodTypeProvider } from 'fastify-type-provider-zod'

// export async function processWebhookRoute(app: FastifyInstance) {
//   app
//     .withTypeProvider<ZodTypeProvider>()
//     .register(auth)
//     .post(
//       '/webhooks/:provider',
//       {
//         schema: {
//           tags: ['Transactions'],
//           summary: 'Create a transaction using a payment gateway',
//           params: z.object({
//             provider: z.string(),
//           }),
//           body: z.object({
//             provider: z.string().min(1, 'Provider is required'),
//             method: z.enum(['pix', 'credit_card', 'boleto']),
//             amount: z.number().positive('Amount must be a positive number'),
//             currency: z.enum(['BRL', 'USD', 'EUR']),
//             description: z.string().optional(),
//             cardToken: z.string().optional(),
//             installments: z.number().min(1).optional(),
//             customer: z.object({
//               email: z.string().email('Invalid email'),
//               name: z.string().min(1, 'Customer name is required'),
//             }),
//           }),
//           response: {
//             200: z.object({
//               success: z.boolean(),
//               message: z.string(),
//             }),
//             400: z.object({
//               success: z.boolean(),
//               message: z.string(),
//             }),
//           },
//         },
//       },
//       async (request, reply) => {
//         const { provider } = request.params
//         const data = request.body

//         try {
//           await handleWebhook(provider, data)
//           reply
//             .status(200)
//             .send({ success: true, message: 'Webhook processed.' })
//         } catch (error) {
//           console.error('❌ Webhook Error:', error)
//           reply.status(400).send({ success: false, message: error.message })
//         }
//       },
//     )
// }
