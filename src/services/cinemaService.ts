import { Cinema, Prisma, Seat } from '@prisma/client';
import { prisma } from '../config/prismaClient';

export const createCinemaService = async (numSeats: number): Promise<Cinema> => {
  const cinema = await prisma.cinema.create({
    data: {
      seats: {
        create: Array.from({ length: numSeats }, (_, index) => ({
          seatNumber: index + 1,
        })),
      },
    },
  });
  return cinema;
};

export const purchaseSeatService = async (cinemaId: string, seatNumber: number): Promise<Seat> => {
  try {
    const seat = await prisma.$transaction(async (tx) => {
      const result = await tx.$queryRaw<Seat[]>`
        SELECT * FROM seat 
        WHERE cinemaId = ${cinemaId} 
        AND seatNumber = ${seatNumber} 
        FOR UPDATE;
      `;

      const seat = result[0];

      if (!seat) {
        throw new Error('Seat not found');
      }

      if (seat.purchased) {
        throw new Error('Seat already purchased');
      }

      return await tx.seat.update({
        where: { id: seat.id, purchased: false },
        data: { purchased: true }
      });
    });

    return seat;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new Error('Seat not found');
      }
    }
    throw error;
  }
};

export const purchaseConsecutiveSeatsService = async (cinemaId: string): Promise<Seat[]> => {
  try {
    const purchasedSeats = await prisma.$transaction(async (tx) => {
      const seats = await tx.$queryRaw<Seat[]>`
        SELECT * FROM seat 
        WHERE cinemaId = ${cinemaId} 
        AND purchased = false 
        ORDER BY seatNumber ASC 
        FOR UPDATE;
      `;
      for (let i = 0; i < seats.length - 1; i++) {
        if (seats[i].seatNumber + 1 === seats[i + 1].seatNumber) {
          await tx.seat.updateMany({
            where: {
              cinemaId,
              seatNumber: {
                in: [seats[i].seatNumber, seats[i + 1].seatNumber]
              },
              purchased: false
            },
            data: { purchased: true }
          });

          return [seats[i], seats[i + 1]];
        }
      }

      throw new Error('No consecutive seats available');
    });

    return purchasedSeats;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new Error('Seats not found');
      }
    }
    throw error;
  }
};

// Type for better error handling
export interface CustomError extends Error {
  code?: string;
}
