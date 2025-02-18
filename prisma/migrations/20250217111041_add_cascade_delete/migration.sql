-- DropForeignKey
ALTER TABLE `Seat` DROP FOREIGN KEY `Seat_cinemaId_fkey`;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_cinemaId_fkey` FOREIGN KEY (`cinemaId`) REFERENCES `Cinema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
