-- CreateTable
CREATE TABLE `word` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(191) NOT NULL,
    `meaning` VARCHAR(191) NOT NULL,
    `example` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `audio` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `word_id_key`(`id`),
    UNIQUE INDEX `word_word_key`(`word`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
