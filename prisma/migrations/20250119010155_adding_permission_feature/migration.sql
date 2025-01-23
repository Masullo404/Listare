/*
  Warnings:

  - Changed the type of `permission` on the `share` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "permission" AS ENUM ('VIEWER', 'EDITOR');

-- AlterTable
ALTER TABLE "share" DROP COLUMN "permission",
ADD COLUMN     "permission" "permission" NOT NULL;
