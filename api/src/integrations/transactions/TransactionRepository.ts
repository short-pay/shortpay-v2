import { prisma } from '@/prisma/client'

export class TransactionRepository {
  async findById(id: string) {
    return prisma.gatewayTransaction.findUnique({ where: { id } })
  }

  async findByOrganization(organizationId: string) {
    return prisma.gatewayTransaction.findMany({ where: { organizationId } })
  }
}
