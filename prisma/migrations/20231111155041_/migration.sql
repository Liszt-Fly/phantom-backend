/*
  Warnings:

  - Added the required column `date` to the `word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `word` ADD COLUMN `date` DATETIME(3) NOT NULL,
    MODIFY `image` LONGTEXT NOT NULL;
