import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDatabase } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import bookRoutes from './routes/bookRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/wishlist', wishlistRoutes);

app.use(errorHandler);

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });
