/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `TenantUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Machine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MachineMuscle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Muscle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkId` to the `TenantUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TenantUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Branch" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Machine" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."MachineMuscle" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Muscle" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."TenantUser" ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'MEMBER';

-- CreateIndex
CREATE UNIQUE INDEX "TenantUser_clerkId_key" ON "public"."TenantUser"("clerkId");
