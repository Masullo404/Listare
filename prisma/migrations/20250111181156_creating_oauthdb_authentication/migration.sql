/*
  Warnings:

  - A unique constraint covering the columns `[oauth_id,oauth_provider]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `oauth_id` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oauth_provider` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "oauth_id" INTEGER NOT NULL,
ADD COLUMN     "oauth_provider" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_oauth_id_oauth_provider_key" ON "user"("oauth_id", "oauth_provider");
