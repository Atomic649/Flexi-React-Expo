/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Member_uniqueId_key" ON "Member"("uniqueId");
