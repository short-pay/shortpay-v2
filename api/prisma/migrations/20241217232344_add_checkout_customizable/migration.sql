/*
  Warnings:

  - You are about to drop the column `customCss` on the `checkouts` table. All the data in the column will be lost.
  - You are about to drop the column `customHtml` on the `checkouts` table. All the data in the column will be lost.
  - Added the required column `currency` to the `checkouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkouts" DROP COLUMN "customCss",
DROP COLUMN "customHtml",
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "custom_css" TEXT,
ADD COLUMN     "custom_html" TEXT,
ADD COLUMN     "orderBump" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'default';
