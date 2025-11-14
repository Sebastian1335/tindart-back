/*
  Warnings:

  - A unique constraint covering the columns `[userOneId,userTwoId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conversation_userOneId_userTwoId_key" ON "Conversation"("userOneId", "userTwoId");
