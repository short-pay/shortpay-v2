import { OrbitaPayV2Provider } from './providers/orbita-pay-v2-provider'
import { PayoutProvider } from './providers/payout-provider'
import type { GatewayBase } from './base/gateway-base'

export function getGateway(provider: string): GatewayBase {
  switch (provider) {
    case 'orbitaPayV2Provider':
      return new OrbitaPayV2Provider()
    case 'payoutProvider':
      return new PayoutProvider()
    default:
      throw new Error(`Unknown gateway provider: ${provider}`)
  }
}
