/*
  Warnings:

  - A unique constraint covering the columns `[idSeguidor,idSeguido]` on the table `Follows` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Follows_idSeguidor_idSeguido_key" ON "Follows"("idSeguidor", "idSeguido");
