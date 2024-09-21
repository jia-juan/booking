/*
  Warnings:

  - Made the column `takeTime` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "takeTime" SET NOT NULL,
ALTER COLUMN "takeTime" SET DEFAULT 0;
