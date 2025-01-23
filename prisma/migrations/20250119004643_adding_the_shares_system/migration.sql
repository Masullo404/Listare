-- CreateTable
CREATE TABLE "share" (
    "userOneId" INTEGER NOT NULL,
    "userTwoId" INTEGER NOT NULL,
    "listId" INTEGER NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "share_pkey" PRIMARY KEY ("userOneId","userTwoId","listId")
);

-- AddForeignKey
ALTER TABLE "share" ADD CONSTRAINT "share_userOneId_fkey" FOREIGN KEY ("userOneId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "share" ADD CONSTRAINT "share_userTwoId_fkey" FOREIGN KEY ("userTwoId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "share" ADD CONSTRAINT "share_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
