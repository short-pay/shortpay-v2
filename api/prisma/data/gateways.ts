import { GatewayEngine } from '@prisma/client'

export type GatewaySeedData = {
  name: string
  provider: string
  domain: string
  description: string
  iconUrl: string
  isGlobal: boolean
  engine: GatewayEngine
}

export const gateways: GatewaySeedData[] = [
  // === PAYMAKER ===
  {
    name: 'Pague Easy',
    provider: 'pagueEasy',
    description:
      'Com Pague Easy, oferecemos simplicidade e eficiência no pagamento das suas vendas.',
    iconUrl: '/icons/gateways/pagueeasy.ico',
    isGlobal: false,
    engine: GatewayEngine.PAYMAKER,
    domain: '',
  },
  {
    name: 'CorePay',
    provider: 'corepay',
    description:
      'CorePay fornece processamento de pagamentos seguro para comerciantes de todos os níveis de risco.',
    iconUrl: '/icons/gateways/corepay.ico',
    domain: 'corepay.net',
    isGlobal: false,
    engine: GatewayEngine.PAYMAKER,
    // https://app.corepaybr.com/docs
  },
  {
    name: 'Venuz Pay',
    provider: 'venuzPay',
    description:
      'Venuz Pay conecta você ao mundo com pagamentos globais fáceis e rápidos.',
    iconUrl: '/icons/gateways/venuzpay.ico',
    isGlobal: true,
    engine: GatewayEngine.PAYMAKER,
    domain: '',
    // https://app.venuzpay.com/docs
  },

  // === HOPI ===
  {
    name: 'Órbita Pay V2',
    provider: 'orbitaPayV2',
    description:
      'Na Órbita os pagamentos das vendas de seus produtos e serviços digitais possuem a maior taxa de aprovação do mercado e saque instantâneo.',
    iconUrl: '/icons/gateways/orbitapay.ico',
    isGlobal: false,
    engine: GatewayEngine.HOPI,
    domain: '',
  },
  {
    name: 'Payout',
    provider: 'payout',
    description:
      'Payout oferece soluções inteligentes para impulsionar as suas vendas e aumentar os seus lucros.',
    iconUrl: '/icons/gateways/payout.ico',
    isGlobal: false,
    engine: GatewayEngine.HOPI,
    domain: '',
    // https://payoutbr.readme.io/reference/introducao
  },
  {
    name: 'Pagou.Aí',
    provider: 'pagouAi',
    description:
      'Pagou.Aí é uma plataforma de pagamentos inteligentes e intuitiva.',
    iconUrl: '/icons/gateways/pagouai.ico',
    domain: 'pagou.ai',
    isGlobal: true,
    engine: GatewayEngine.HOPI,
    // https://pagouai.readme.io/reference/introducao // **
  },

  // === SHIELD ===
  {
    name: 'Golden',
    provider: 'golden',
    description:
      'Golden oferece soluções de pagamento personalizadas para empresas.',
    iconUrl: '/icons/gateways/golden.ico',
    domain: 'golden.com',
    isGlobal: false,
    engine: GatewayEngine.SHIELD,
  },
  {
    name: 'Master',
    provider: 'master',
    description:
      'Master é um banco digital com soluções financeiras completas.',
    iconUrl: '/icons/gateways/master.ico',
    domain: 'masterpayment.com.br',
    isGlobal: true,
    engine: GatewayEngine.SHIELD,
  },
  {
    name: 'Rush Pay',
    provider: 'rushPay',
    description:
      'Rush Pay é sua solução de pagamento ágil e segura para expandir seus negócios.',
    iconUrl: '/icons/gateways/rushpay.ico',
    isGlobal: false,
    engine: GatewayEngine.SHIELD,
    domain: '',
  },
]
