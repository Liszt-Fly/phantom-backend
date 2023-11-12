/*
  Warnings:

  - Added the required column `exampleSentence` to the `word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `word` ADD COLUMN `exampleSentence` VARCHAR(191) NOT NULL,
    ADD COLUMN `symbol` VARCHAR(191) NOT NULL;
