/*
  Warnings:

  - The values [MODERATOR] on the enum `RoleType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleType_new" AS ENUM ('ADMIN', 'USER', 'SUPERADMIN');
ALTER TABLE "Role" ALTER COLUMN "name" TYPE "RoleType_new" USING ("name"::text::"RoleType_new");
ALTER TYPE "RoleType" RENAME TO "RoleType_old";
ALTER TYPE "RoleType_new" RENAME TO "RoleType";
DROP TYPE "public"."RoleType_old";
COMMIT;

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0;
