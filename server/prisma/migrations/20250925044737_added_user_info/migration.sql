/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `TenantUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `TenantUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `TenantUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."TenantUser" DROP CONSTRAINT "TenantUser_tenantId_fkey";

-- AlterTable
ALTER TABLE "public"."TenantUser" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "tenantId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TenantUser_email_key" ON "public"."TenantUser"("email");

-- AddForeignKey
ALTER TABLE "public"."TenantUser" ADD CONSTRAINT "TenantUser_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
