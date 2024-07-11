-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verificatintoken" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
