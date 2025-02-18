/*
  Warnings:

  - The primary key for the `Cinema` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Seat` DROP FOREIGN KEY `Seat_cinemaId_fkey`;

-- AlterTable
ALTER TABLE `Cinema` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Seat` MODIFY `cinemaId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_cinemaId_fkey` FOREIGN KEY (`cinemaId`) REFERENCES `Cinema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
