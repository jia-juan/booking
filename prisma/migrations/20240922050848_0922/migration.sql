/*
  Warnings:

  - You are about to drop the column `createdById` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'EXPIRED';

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_createdById_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "createdById",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
