import { PrismaClient } from '@prisma/client'
import { gateways } from './data/gateways'

const prisma = new PrismaClient()

async function main() {
  for (const gateway of gateways) {
    await prisma.gateway.upsert({
      where: { provider: gateway.provider },
      update: {
        name: gateway.name,
        description: gateway.description,
        iconUrl: gateway.iconUrl,
        isGlobal: gateway.isGlobal,
        engine: gateway.engine,
      },
      create: {
        provider: gateway.provider,
        name: gateway.name,
        description: gateway.description,
        iconUrl: gateway.iconUrl,
        isGlobal: gateway.isGlobal,
        engine: gateway.engine,
        createdAt: new Date(),
      },
    })
  }

  console.log('✅ Gateways atualizados com sucesso.')
}

main()
  .catch((e) => {
    console.error('❌ Erro ao rodar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
