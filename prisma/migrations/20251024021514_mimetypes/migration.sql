-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "mimeType" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "mimeType" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "profilePictures" (
    "id" SERIAL NOT NULL,
    "profilePicture" BYTEA,
    "profileMimeType" TEXT,
    "wallPicture" BYTEA,
    "wallMimeType" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "profilePictures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profilePictures_userId_key" ON "profilePictures"("userId");

-- AddForeignKey
ALTER TABLE "profilePictures" ADD CONSTRAINT "profilePictures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
