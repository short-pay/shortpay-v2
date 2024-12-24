export type Gateway = {
  name: string
  provider: string
  description: string
  icon: string
  domain: string
  isGlobal: boolean
}

export const gateways: Gateway[] = [
  {
    name: 'Órbita Pay V2',
    provider: 'orbitaPayV2',
    description:
      'Na Órbita os pagamentos das vendas de seus produtos e serviços digitais possuem a maior taxa de aprovação do mercado e saque instantâneo.',
    icon: '/icons/gateways/orbitapay.ico',
    domain: 'orbitapay.com.br',
    isGlobal: false,
  },
  {
    name: 'Payout',
    provider: 'payout',
    description:
      'Payout oferece soluções inteligentes para impulsionar as suas vendas e aumentar os seus lucros.',
    icon: '/icons/gateways/payout.ico',
    domain: 'payoutbr.com.br',
    isGlobal: false,
  },
  {
    name: 'Rush Pay',
    provider: 'rushPay',
    description:
      'Rush Pay é sua solução de pagamento ágil e segura para expandir seus negócios.',
    icon: '/icons/gateways/rushpay.ico',
    domain: 'rushpay.pro',
    isGlobal: false,
  },
  {
    name: 'Pague Easy',
    provider: 'pagueEasy',
    description:
      'Com Pague Easy, oferecemos simplicidade e eficiência no pagamento das suas vendas.',
    icon: '/icons/gateways/pagueeasy.ico',
    domain: 'pagueeasy.com',
    isGlobal: false,
  },
  {
    name: 'Venuz Pay',
    provider: 'venuzPay',
    description:
      'Venuz Pay conecta você ao mundo com pagamentos globais fáceis e rápidos.',
    icon: '/icons/gateways/venuzpay.ico',
    domain: 'venuzpay.com',
    isGlobal: true,
  },
]
