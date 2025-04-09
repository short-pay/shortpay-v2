-- AlterTable
ALTER TABLE "gateway_transactions" ADD COLUMN     "external_id" TEXT,
ADD COLUMN     "metadata" JSONB;
