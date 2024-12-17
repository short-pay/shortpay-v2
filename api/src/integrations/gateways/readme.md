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
