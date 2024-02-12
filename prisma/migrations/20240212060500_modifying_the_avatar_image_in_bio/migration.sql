/*
  Warnings:

  - The `avatarImage` column on the `Bio` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Bio" DROP COLUMN "avatarImage",
ADD COLUMN     "avatarImage" TEXT[] DEFAULT ARRAY[]::TEXT[];
