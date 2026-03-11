import { Request, Response, NextFunction } from 'express';
import { searchGoogleBooks } from '../services/googleBooksService.js';

export async function getBooksByQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query = String(req.query.q || '').trim();

    if (!query) {
      res.status(400).json({ message: 'Query parameter "q" is required' });
    }

    const books = await searchGoogleBooks(query);

    res.json(books);
  } catch (error) {
    next(error);
  }
}
