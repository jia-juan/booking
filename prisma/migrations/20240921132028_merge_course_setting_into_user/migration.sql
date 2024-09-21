/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "maxStudent" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "takeTime" INTEGER;

-- DropTable
DROP TABLE "Course";
