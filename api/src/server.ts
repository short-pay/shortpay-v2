import { app } from '@/app'
import { env } from '@/env'

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(
    `🚀 HTTP Server is Running on http://${env.HOST || 'localhost'}:${env.PORT}/docs`,
  )
})
