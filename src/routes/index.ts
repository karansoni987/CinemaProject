import express from 'express';
const router = express.Router();

import { viApiRoutes } from './v1';

router.use('/v1', viApiRoutes);

export { router as ApiRoutes };