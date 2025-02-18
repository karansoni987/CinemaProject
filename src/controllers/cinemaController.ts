import { Request, Response } from 'express';
import { createCinemaService, purchaseConsecutiveSeatsService, purchaseSeatService } from '../services/cinemaService';

export const createCinema = async (req: Request, res: Response): Promise<void> => {
    try {
        const { numSeats } = req.body;
        const cinema = await createCinemaService(numSeats);
        res.status(201).json({ cinemaId: cinema.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create cinema' });
    }
};

export const purchaseSeat = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cinemaId, seatNumber } = req.body;
        const purchasedSeat = await purchaseSeatService(cinemaId, seatNumber);
        res.status(200).json(purchasedSeat);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

export const purchaseConsecutiveSeats = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cinemaId } = req.body;
        const purchasedSeats = await purchaseConsecutiveSeatsService(cinemaId);
        res.status(200).json({ seats: purchasedSeats });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};
