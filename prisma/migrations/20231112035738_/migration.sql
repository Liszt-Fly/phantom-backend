/*
  Warnings:

  - You are about to drop the column `exampleSentence` on the `word` table. All the data in the column will be lost.
  - Added the required column `exampleTranslation` to the `word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `word` DROP COLUMN `exampleSentence`,
    ADD COLUMN `exampleTranslation` VARCHAR(191) NOT NULL;
