-- AlterTable
ALTER TABLE "funnelPages" ADD COLUMN     "order" INTEGER,
ADD COLUMN     "pathName" TEXT;

-- AlterTable
ALTER TABLE "funnels" ADD COLUMN     "liveProducts" TEXT;
