-- CreateTable
CREATE TABLE "Replies" (
    "id" TEXT NOT NULL,
    "repliestoId" TEXT,
    "replies" TEXT,
    "userId" TEXT,

    CONSTRAINT "Replies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriesToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriesToPost_AB_unique" ON "_CategoriesToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriesToPost_B_index" ON "_CategoriesToPost"("B");

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_repliestoId_fkey" FOREIGN KEY ("repliestoId") REFERENCES "Post"("postId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToPost" ADD CONSTRAINT "_CategoriesToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToPost" ADD CONSTRAINT "_CategoriesToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;
