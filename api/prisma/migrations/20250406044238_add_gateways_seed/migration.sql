/*
  Warnings:

  - You are about to drop the column `engine` on the `gateway_configs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organization_id]` on the table `gateway_configs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "gateway_configs_engine_organization_id_key";

-- AlterTable
ALTER TABLE "Gateway" ADD COLUMN     "isGlobal" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "gateway_configs" DROP COLUMN "engine";

-- CreateIndex
CREATE UNIQUE INDEX "gateway_configs_organization_id_key" ON "gateway_configs"("organization_id");
