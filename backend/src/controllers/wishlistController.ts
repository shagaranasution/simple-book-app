import { Request, Response, NextFunction } from 'express';
import { WishlistBook } from '../models/WishlistBook.js';

export async function getWishlist(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const books = await WishlistBook.find().sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    next(error);
  }
}

export async function addToWishlist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = req.body;

    if (!payload.googleBookId || !payload.title) {
      res.status(400).json({ message: 'googleBookId and title are required' });
    }

    const existingBook = await WishlistBook.findOne({
      googleBookId: payload.googleBookId,
    });

    if (existingBook) {
      res.status(409).json({ message: 'This book is already in the wishlist' });
    }

    const createdBook = await WishlistBook.create(payload);
    res.status(201).json(createdBook);
  } catch (error) {
    next(error);
  }
}

export async function removeFromWishlist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { googleBookId } = req.params;

    const deletedBook = await WishlistBook.findOneAndDelete({ googleBookId });

    if (!deletedBook) {
      res.status(404).json({ message: 'Book not found in wishlist' });
    }

    res.json({ message: 'Book removed from wishlist' });
  } catch (error) {
    next(error);
  }
}
