import { Router } from 'express';
import { createCinema, purchaseConsecutiveSeats, purchaseSeat } from '../../controllers/cinemaController';

const router = Router();

router.post('/create', createCinema);
router.post('/purchase/seat', purchaseSeat);
router.post('/purchase/consecutive-seats', purchaseConsecutiveSeats);

export { router as cinemaRoutes };
