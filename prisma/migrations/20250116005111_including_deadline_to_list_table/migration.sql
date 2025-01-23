/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `list` table. All the data in the column will be lost.
  - Added the required column `Deadline` to the `list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "list" DROP COLUMN "CreatedAt",
ADD COLUMN     "Deadline" TEXT NOT NULL;
