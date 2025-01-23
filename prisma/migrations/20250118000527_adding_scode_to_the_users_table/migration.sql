/*
  Warnings:

  - A unique constraint covering the columns `[Scode]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "Scode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_Scode_key" ON "user"("Scode");
