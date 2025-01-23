/*
  Warnings:

  - You are about to drop the `Checkout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Checkout" DROP CONSTRAINT "Checkout_funnelId_fkey";

-- DropForeignKey
ALTER TABLE "Checkout" DROP CONSTRAINT "Checkout_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "funnelPages" DROP CONSTRAINT "funnelPages_checkoutId_fkey";

-- DropForeignKey
ALTER TABLE "gateway_transactions" DROP CONSTRAINT "gateway_transactions_checkoutId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_checkoutId_fkey";

-- DropTable
DROP TABLE "Checkout";

-- CreateTable
CREATE TABLE "checkouts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "content" JSONB NOT NULL DEFAULT '{}',
    "previewImage" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'BRL',
    "convertedCurrency" TEXT NOT NULL,
    "convertedAmount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "organization_id" TEXT NOT NULL,
    "funnelId" TEXT,

    CONSTRAINT "checkouts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_checkoutId_fkey" FOREIGN KEY ("checkoutId") REFERENCES "checkouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gateway_transactions" ADD CONSTRAINT "gateway_transactions_checkoutId_fkey" FOREIGN KEY ("checkoutId") REFERENCES "checkouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkouts" ADD CONSTRAINT "checkouts_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkouts" ADD CONSTRAINT "checkouts_funnelId_fkey" FOREIGN KEY ("funnelId") REFERENCES "funnels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funnelPages" ADD CONSTRAINT "funnelPages_checkoutId_fkey" FOREIGN KEY ("checkoutId") REFERENCES "checkouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
