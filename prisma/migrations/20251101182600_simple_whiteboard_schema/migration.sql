-- CreateTable
CREATE TABLE "WhiteBoard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "snapshot" JSONB,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhiteBoard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WhiteBoard" ADD CONSTRAINT "WhiteBoard_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
