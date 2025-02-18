import express from 'express';
import { cinemaRoutes } from './cinemaRoutes';
const router = express.Router();

router.use('/cinema', cinemaRoutes)

export { router as viApiRoutes };
