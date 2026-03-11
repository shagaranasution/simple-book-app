import { Router } from 'express';
import { getBooksByQuery } from '../controllers/bookController.js';

const router = Router();

router.get('/search', getBooksByQuery);

export default router;
