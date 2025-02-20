/*
  Warnings:

  - Added the required column `endpoint` to the `gateway_configs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gateway_configs" ADD COLUMN     "endpoint" TEXT NOT NULL;
