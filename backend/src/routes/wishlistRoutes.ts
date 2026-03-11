import { Router } from 'express';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../controllers/wishlistController.js';

const router = Router();

router.get('/', getWishlist);
router.post('/', addToWishlist);
router.delete('/:googleBookId', removeFromWishlist);

export default router;
