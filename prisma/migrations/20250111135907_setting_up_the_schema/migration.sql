-- CreateEnum
CREATE TYPE "situation" AS ENUM ('URGENT', 'DELETED', 'FINISHED', 'UNFINISHED');

-- CreateEnum
CREATE TYPE "priority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list" (
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "priotity" "priority" NOT NULL,

    CONSTRAINT "list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "situation" "situation" NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listId" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("name","userId")
);

-- CreateTable
CREATE TABLE "tags" (
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "listId" INTEGER NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("userId","listId")
);

-- CreateTable
CREATE TABLE "friend" (
    "friendOne" INTEGER NOT NULL,
    "friendTwo" INTEGER NOT NULL,

    CONSTRAINT "friend_pkey" PRIMARY KEY ("friendOne","friendTwo")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "list_name_userId_key" ON "list"("name", "userId");

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_friendOne_fkey" FOREIGN KEY ("friendOne") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_friendTwo_fkey" FOREIGN KEY ("friendTwo") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
