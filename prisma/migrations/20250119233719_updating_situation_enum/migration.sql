/*
  Warnings:

  - The values [URGENT,DELETED] on the enum `situation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "situation_new" AS ENUM ('FINISHED', 'UNFINISHED');
ALTER TABLE "task" ALTER COLUMN "situation" TYPE "situation_new" USING ("situation"::text::"situation_new");
ALTER TYPE "situation" RENAME TO "situation_old";
ALTER TYPE "situation_new" RENAME TO "situation";
DROP TYPE "situation_old";
COMMIT;
