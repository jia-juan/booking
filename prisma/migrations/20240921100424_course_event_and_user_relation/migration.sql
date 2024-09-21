/*
  Warnings:

  - You are about to drop the column `studentId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `spanRows` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startRow` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_studentId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "studentId",
ADD COLUMN     "spanRows" INTEGER NOT NULL,
ADD COLUMN     "startRow" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Course" (
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "takeTime" INTEGER,
    "maxStudent" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "_EventStudentRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_userId_key" ON "Course"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_EventStudentRelation_AB_unique" ON "_EventStudentRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_EventStudentRelation_B_index" ON "_EventStudentRelation"("B");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventStudentRelation" ADD CONSTRAINT "_EventStudentRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventStudentRelation" ADD CONSTRAINT "_EventStudentRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
