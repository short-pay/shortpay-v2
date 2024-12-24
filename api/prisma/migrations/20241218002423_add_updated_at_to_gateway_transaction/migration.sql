-- AlterTable
ALTER TABLE "gateway_transactions" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
