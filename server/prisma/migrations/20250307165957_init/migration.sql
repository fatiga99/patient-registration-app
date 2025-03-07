-- CreateTable
CREATE TABLE `Patient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phoneNumber` VARCHAR(20) NOT NULL,
    `documentPhoto` MEDIUMBLOB NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Patient_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
