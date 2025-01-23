/*
  Warnings:

  - Made the column `order` on table `funnelPages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "funnelPages" ALTER COLUMN "order" SET NOT NULL;
