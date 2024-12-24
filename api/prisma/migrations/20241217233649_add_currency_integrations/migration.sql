-- AlterTable
ALTER TABLE "checkouts" ADD COLUMN     "convertedAmount" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'BRL';
