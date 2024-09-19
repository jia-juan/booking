-- CreateEnum
CREATE TYPE "NotifyHow" AS ENUM ('EMAIL', 'LINE', 'NONE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notifyBooking" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifyEvent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifyHow" "NotifyHow" NOT NULL DEFAULT 'NONE';
