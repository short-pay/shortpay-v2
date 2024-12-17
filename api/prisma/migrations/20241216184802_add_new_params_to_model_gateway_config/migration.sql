/*
  Warnings:

  - You are about to drop the column `name` on the `gateway_configs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,organization_id]` on the table `gateway_configs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider` to the `gateway_configs` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "gateway_configs_name_organization_id_key";

-- AlterTable
ALTER TABLE "gateway_configs" DROP COLUMN "name",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "installmentFee" DOUBLE PRECISION,
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "public_key" TEXT,
ADD COLUMN     "webhook_secret" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "gateway_configs_provider_organization_id_key" ON "gateway_configs"("provider", "organization_id");
