/*
  Warnings:

  - You are about to drop the column `password` on the `orgs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password_hash` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "password",
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");
