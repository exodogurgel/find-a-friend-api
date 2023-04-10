/*
  Warnings:

  - You are about to drop the `pet_galery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pet_galery" DROP CONSTRAINT "pet_galery_pet_id_fkey";

-- DropTable
DROP TABLE "pet_galery";

-- CreateTable
CREATE TABLE "pet_gallery" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pet_gallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet_gallery" ADD CONSTRAINT "pet_gallery_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
