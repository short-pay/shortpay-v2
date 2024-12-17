export class TransactionService {
  async createTransaction(data: any) {
    return prisma.gatewayTransaction.create({ data })
  }

  async getTransaction(id: string) {
    return prisma.gatewayTransaction.findUnique({ where: { id } })
  }

  async updateTransaction(id: string, status: string) {
    return prisma.gatewayTransaction.update({
      where: { id },
      data: { status },
    })
  }
}
