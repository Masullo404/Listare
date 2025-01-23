-- AlterTable
CREATE SEQUENCE list_id_seq;
ALTER TABLE "list" ALTER COLUMN "id" SET DEFAULT nextval('list_id_seq');
ALTER SEQUENCE list_id_seq OWNED BY "list"."id";
