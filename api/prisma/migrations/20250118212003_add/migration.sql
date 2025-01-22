/*
  Warnings:

  - You are about to drop the `FunnelPage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FunnelPage" DROP CONSTRAINT "FunnelPage_checkoutId_fkey";

-- DropForeignKey
ALTER TABLE "FunnelPage" DROP CONSTRAINT "FunnelPage_funnel_id_fkey";

-- DropTable
DROP TABLE "FunnelPage";

-- DropTable
DROP TABLE "Template";

-- CreateTable
CREATE TABLE "funnelPages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "content" JSONB NOT NULL DEFAULT '{}',
    "type" "FunnelPageType" NOT NULL DEFAULT 'GENERIC',
    "previewImage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "funnel_id" TEXT,
    "checkoutId" TEXT,

    CONSTRAINT "funnelPages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "templetes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "content" JSONB NOT NULL DEFAULT '{}',
    "previewImage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "templetes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "funnelPages_path_key" ON "funnelPages"("path");

-- AddForeignKey
ALTER TABLE "funnelPages" ADD CONSTRAINT "funnelPages_funnel_id_fkey" FOREIGN KEY ("funnel_id") REFERENCES "funnels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funnelPages" ADD CONSTRAINT "funnelPages_checkoutId_fkey" FOREIGN KEY ("checkoutId") REFERENCES "Checkout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
