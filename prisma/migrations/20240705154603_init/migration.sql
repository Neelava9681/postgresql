/*
  Warnings:

  - You are about to drop the column `address` on the `ContactBook` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ContactBook` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ContactBook` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ContactBook` table. All the data in the column will be lost.
  - Added the required column `Contacts_book_Name` to the `ContactBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `ContactBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Postal_Address` to the `ContactBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactBook" DROP COLUMN "address",
DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "Contacts_book_Name" TEXT NOT NULL,
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "Postal_Address" TEXT NOT NULL;
