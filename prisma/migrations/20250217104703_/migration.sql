/*
  Warnings:

  - A unique constraint covering the columns `[cinemaId,seatNumber]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Seat_cinemaId_seatNumber_key` ON `Seat`(`cinemaId`, `seatNumber`);
