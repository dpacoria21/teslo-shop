/*
  Warnings:

  - Added the required column `productId` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
