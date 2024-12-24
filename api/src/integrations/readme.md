src/
├── integrations/                 # Pasta dedicada para integrações
│   ├── gateways/                 # Subpasta para gateways de pagamento
│   │   ├── index.ts              # Registro central dos gateways
│   │   ├── GatewayFactory.ts     # Fábrica para instanciar gateways
│   │   ├── interfaces/           # Interfaces compartilhadas
│   │   │   ├── GatewayInterface.ts
│   │   │   ├── PaymentMethodInterface.ts
│   │   ├── base/                 # Classes base
│   │   │   ├── GatewayBase.ts
│   │   │   ├── PaymentMethodBase.ts
│   │   ├── providers/            # Implementações específicas de gateways
│   │   │   ├── OrbitaPayV2Provider.ts
│   │   │   ├── PayoutProvider.ts
│   │   ├── methods/              # Métodos de pagamento (Pix, crédito, boleto)
│   │   │   ├── PixMethod.ts
│   │   │   ├── CreditCardMethod.ts
│   │   │   ├── BoletoMethod.ts
│   │   ├── config/               # Configurações dos gateways
│   │   │   ├── GatewaysConfig.ts
│   │   ├── utils/                # Utilitários específicos de gateways
│   │       ├── CurrencyUtils.ts
│   │       ├── ValidationUtils.ts
│   │
│   ├── transactions/             # Subpasta para transações
│       ├── TransactionService.ts # Gerenciamento de transações
│       ├── TransactionRepository.ts # Acesso ao banco de dados
│       ├── WebhookHandler.ts     # Lógica para lidar com webhooks
│
├── prisma/                       # Prisma ORM
│   ├── schema.prisma             # Schema principal
│   ├── client.ts                 # Cliente Prisma
│
├── app.ts                        # Configuração principal da aplicação






import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import axios from 'axios'
import { prisma } from '@/lib/prisma'
import { env } from '@/env'
import { decrypt } from '@/utils/crypto/crypto-utils'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function createTransaction(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/transactions',
    {
      schema: {
        tags: ['Transactions'],
        summary: 'Create a new transaction',
        body: z.object({
          checkoutId: z.string(),
          productId: z.string(),
          customer: z.object({
            document: z.object({
              number: z.string().length(11, 'Invalid CPF format.'),
              type: z.string().default('cpf'),
            }),
            name: z.string(),
            email: z.string().email(),
            phone: z.string(),
          }),
        }),
      },
    },
    async (request, reply) => {
      console.log('📥 Request body received:', request.body)
      const { checkoutId, productId, customer } = request.body

      // Define o Postback URL
      const postbackUrl =
        env.NODE_ENV === 'production'
          ? env.POSTBACK_URL_PROD
          : env.POSTBACK_URL_DEV
      console.log('🌍 Postback URL set to:', postbackUrl)

      try {
        // Busca informações do Checkout
        const checkout = await prisma.checkout.findUnique({
          where: { id: checkoutId },
        })
        if (!checkout) throw new Error('Checkout not found.')
        console.log('✅ Checkout found:', checkout)

        // Busca informações do Produto
        const product = await prisma.product.findUnique({
          where: { id: productId },
        })
        if (!product) throw new Error('Product not found.')
        console.log('✅ Product found:', product)

        // Busca as configurações do Gateway
        const gatewayConfig = await prisma.gatewayConfig.findFirst({
          where: {
            organizationId: checkout.organizationId,
            provider: 'orbitaPayV2Provider',
          },
        })
        if (!gatewayConfig) throw new Error('Gateway configuration not found.')
        console.log('✅ Gateway configuration found:', gatewayConfig)

        // Descriptografa as chaves
        const decryptedSecretKey = decrypt(gatewayConfig.secretKey)
        const decryptedApiKey = decrypt(gatewayConfig.apiKey)
        console.log('🔑 Decrypted keys:', {
          // biome-ignore lint/style/useTemplate: <explanation>
          decryptedSecretKey: decryptedSecretKey.slice(0, 4) + '***', // Oculta parte da chave
          // biome-ignore lint/style/useTemplate: <explanation>
          decryptedApiKey: decryptedApiKey.slice(0, 4) + '***',
        })

        // Configura o cabeçalho de autenticação
        const authHeader = `Basic ${Buffer.from(`${decryptedSecretKey}:${decryptedApiKey}`).toString('base64')}`
        console.log('🔒 Auth Header generated:', authHeader)

        // Monta o payload
        const payload = {
          customer: {
            document: {
              number: customer.document.number,
              type: customer.document.type, // "cpf"
            },
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            externalRef: `customer-${checkoutId}-${productId}`, // Gerar uma referência única opcional
          },
          pix: {
            expiresInDays: 10, // Alterado para número
          },
          amount: product.price * 100, // Converte para centavos
          paymentMethod: 'pix', // "pix"
          items: [
            {
              tangible: true,
              title: product.name,
              unitPrice: product.price * 100,
              quantity: 1,
              externalRef: `item-${productId}`, // Gerar uma referência única opcional
            },
          ],
        }

        console.log('📡 Payload prepared for API request:', payload)

        // Faz a chamada para a API da ÓrbitaPay
        const response = await axios.post(
          'https://api.dashboard.orbitapay.com.br/v1/transactions',
          payload,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: authHeader,
            },
          },
        )

        const transactionData = response.data
        console.log('✅ Transaction created successfully:', transactionData)

        // Retorna os dados relevantes
        return reply.status(201).send(transactionData)
      } catch (error) {
        console.error('❌ Error creating transaction:', error)
        return reply
          .status(500)
          .send({ message: 'Failed to create transaction.' })
      }
    },
  )



curl --request POST \
     --url https://api.dashboard.orbitapay.com.br/v1/transactions \
     --header 'accept: application/json' \
     --header 'authorization: Basic c2tfbGl2ZV9DTW96OUNRM1oxNU5wUDVSSFA3dmZsaWRiZ1E2d29Xam0zVTBVTUk2MDM6eA==' \
     --header 'content-type: application/json' \
     --data '
{
  "card": {
    "id": "ID do cartão. Obs: Caso seja passado o ID, os outros campos do objeto card são dispensáveis",
    "hash": "Hash do cartão. Obs: A hash é válida por apenas 5 minutos. Não a armazene em seu banco de dados. Caso seja passado a hash, os outros campos do objeto card são dispensáveis.",
    "number": "Número do cartão.",
    "holderName": "Nome do portador do cartão.",
    "expirationMonth": "Mês de expiração",
    "expirationYear": "Ano de expiração",
    "cvv": "CVV do cartão."
  },
  "customer": {
    "document": {
      "number": "Número do documento.",
      "type": "Tipo do documento. Valores possíveis: cpf, cnpj"
    },
    "id": "ID do cliente previamente criado. Não é necessário informar os outros campos caso o ID esteja preenchido.",
    "name": "Nome do cliente.",
    "email": "E-mail do cliente.",
    "phone": "Telefone do cliente. Deve ser passado no formato 1199999999.",
    "externalRef": "Referência do cliente em sua API."
  },
  "amount": "Valor em centavos (500 = R$ 5,00)",
  "paymentMethod": "credit_card",
  "installments": "Quantidade de parcelas. Obrigatório caso paymentMethod seja credit_card",
  "items": [
    {
      "tangible": true,
      "title": "Título do item.",
      "unitPrice": "Preço unitário em centavos. Ex: R$ 5,00 = 500",
      "quantity": "Quantidade do item na transação",
      "externalRef": "Referência do item em sua API."
    }
  ],
  "postbackUrl": "URL em sua API que receberá atualizações da transação.",
  "metadata": "URL em sua API que receberá atualizações da transação.",
  "traceable": false,
  "ip": "IP do cliente."
}
'


curl --request POST \
     --url https://api.dashboard.orbitapay.com.br/v1/transactions \
     --header 'accept: application/json' \
     --header 'authorization: Basic c2tfbGl2ZV9DTW96OUNRM1oxNU5wUDVSSFA3dmZsaWRiZ1E2d29Xam0zVTBVTUk2MDM6eA==' \
     --header 'content-type: application/json' \
     --data '
{
  "customer": {
    "document": {
      "number": "Número do documento.",
      "type": "Tipo do documento. Valores possíveis: cpf, cnpj"
    },
    "id": "ID do cliente previamente criado. Não é necessário informar os outros campos caso o ID esteja preenchido.",
    "name": "Nome do cliente.",
    "email": "E-mail do cliente.",
    "phone": "Telefone do cliente. Deve ser passado no formato 1199999999.",
    "externalRef": "Referência do cliente em sua API."
  },
  "boleto": {
    "expiresInDays": "Tempo de expiração do boleto em dias"
  },
  "amount": "Valor em centavos (500 = R$ 5,00)",
  "paymentMethod": "boleto",
  "items": [
    {
      "tangible": true,
      "title": "Título do item.",
      "unitPrice": "Preço unitário em centavos. Ex: R$ 5,00 = 500",
      "quantity": "Quantidade do item na transação",
      "externalRef": "Referência do item em sua API."
    }
  ],
  "postbackUrl": "URL em sua API que receberá atualizações da transação.",
  "metadata": "URL em sua API que receberá atualizações da transação.",
  "traceable": false,
  "ip": "IP do cliente."
}
'



curl --request POST \
     --url https://api.dashboard.orbitapay.com.br/v1/transactions \
     --header 'accept: application/json' \
     --header 'authorization: Basic c2tfbGl2ZV9DTW96OUNRM1oxNU5wUDVSSFA3dmZsaWRiZ1E2d29Xam0zVTBVTUk2MDM6eA==' \
     --header 'content-type: application/json' \
     --data '
{
  "customer": {
    "document": {
      "number": "Número do documento.",
      "type": "Tipo do documento. Valores possíveis: cpf, cnpj"
    },
    "id": "ID do cliente previamente criado. Não é necessário informar os outros campos caso o ID esteja preenchido.",
    "name": "Nome do cliente.",
    "email": "E-mail do cliente.",
    "phone": "Telefone do cliente. Deve ser passado no formato 1199999999.",
    "externalRef": "Referência do cliente em sua API."
  },
  "pix": {
    "expiresInDays": "Tempo de expiração do PIX em dias"
  },
  "amount": "Valor em centavos (500 = R$ 5,00)",
  "paymentMethod": "boleto",
  "items": [
    {
      "tangible": true,
      "title": "Título do item.",
      "unitPrice": "Preço unitário em centavos. Ex: R$ 5,00 = 500",
      "quantity": "Quantidade do item na transação",
      "externalRef": "Referência do item em sua API."
    }
  ],
  "postbackUrl": "URL em sua API que receberá atualizações da transação.",
  "metadata": "URL em sua API que receberá atualizações da transação.",
  "traceable": false,
  "ip": "IP do cliente."
}
'