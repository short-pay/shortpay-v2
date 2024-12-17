interface GatewayProps {
  name: string
  provider: string
  description: string
  icon: string
}

export const Gateways: GatewayProps[] = [
  {
    name: 'Órbita Pay V2',
    provider: 'orbitaPayV2Provider',
    description:
      'Na Órbita os pagamentos das vendas de seus produtos e serviços digitais  possuem a maior taxa de aprovação do mercado e saque instantâneo.',
    icon: '/icons/gateways/orbitapay.ico',
  },
  {
    name: 'Payout',

    provider: 'payoutProvider',
    description:
      'Payout oferece soluções inteligentes para impulsionar as suas vendas e aumentar os seus lucros.',
    icon: '/icons/gateways/payout.ico',
  },
  // {
  //   name: 'IOPAY',
  //   slug: 'iopay',
  //   provider: 'iopayProvider',
  //   description: 'Online payments with Pix and secure transactions.',
  //   icon: '/icons/iopay.svg',
  //   domain: 'iopay.com.br',
  // },
  // {
  //   name: 'Click2Pay',
  //   slug: 'clickpay',
  //   provider: 'click2PayProvider',
  //   description:
  //     'Pix, credit card, and boleto integration for secure payments.',
  //   icon: '/icons/click2pay.svg',
  //   domain: 'click2pay.com',
  // },
  // {
  //   name: 'MoneyCollect',
  //   slug: 'money-collect',
  //   provider: 'moneyCollectProvider',
  //   description:
  //     'Ideal for e-commerce with support for Pix and boleto payments.',
  //   icon: '/icons/moneycollect.svg',
  //   domain: 'moneycollect.com',
  // },
  // {
  //   name: 'PagSeguro',
  //   slug: 'pagseguro',
  //   provider: 'pagSeguroProvider',
  //   description:
  //     'Popular in Brazil with Pix, credit, and debit payment options.',
  //   icon: '/icons/pagseguro.svg',
  //   domain: 'pagseguro.uol.com.br',
  // },
  // {
  //   name: 'Mercado Pago',
  //   slug: 'mercado-pago',
  //   provider: 'mercadoPagoProvider',
  //   description:
  //     'Supports Pix and offers competitive rates and easy integration.',
  //   icon: '/icons/mercadopago.svg',
  //   domain: 'mercadopago.com.br',
  // },
]
