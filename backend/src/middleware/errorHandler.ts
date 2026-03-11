import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof Error) {
    return res
      .status(500)
      .json({ message: error.message || 'Internal server error' });
  }

  return res.status(500).json({ message: 'Internal server error' });
}
