/*
  Warnings:

  - A unique constraint covering the columns `[provider]` on the table `Gateway` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider` to the `Gateway` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gateway" ADD COLUMN     "provider" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Gateway_provider_key" ON "Gateway"("provider");
