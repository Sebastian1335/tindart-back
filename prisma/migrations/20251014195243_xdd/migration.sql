/*
  Warnings:

  - The `image` column on the `Comment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `image` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "image",
ADD COLUMN     "image" BYTEA;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "image",
ADD COLUMN     "image" BYTEA NOT NULL;
