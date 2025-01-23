/*
  Warnings:

  - You are about to drop the column `priotity` on the `list` table. All the data in the column will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `priority` to the `list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `list` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_listId_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_userId_fkey";

-- AlterTable
ALTER TABLE "list" DROP COLUMN "priotity",
ADD COLUMN     "priority" "priority" NOT NULL,
ADD COLUMN     "tags" TEXT NOT NULL;

-- DropTable
DROP TABLE "tags";
