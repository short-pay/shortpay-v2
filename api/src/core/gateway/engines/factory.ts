import type { GatewayAdapter } from '@/core/types/types'
import { PaymakerAdapter } from './paymaker'
import { HopiAdapter } from './hopi'
import { ShieldAdapter } from './shield'

export const engineFactory: Record<
  string,
  new (
    config: any,
  ) => GatewayAdapter
> = {
  PAYMAKER: PaymakerAdapter,
  HOPI: HopiAdapter,
  SHIELD: ShieldAdapter,
}
