/*
  Warnings:

  - Added the required column `alt` to the `product_image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_image" ADD COLUMN     "alt" TEXT NOT NULL;
