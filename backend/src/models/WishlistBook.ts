import { Schema, model } from 'mongoose';

const wishlistBookSchema = new Schema(
  {
    googleBookId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    authors: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      default: '',
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
    publishedDate: {
      type: String,
      default: 'Unknown',
    },
    description: {
      type: String,
      default: 'No description available.',
    },
  },
  {
    timestamps: true,
  }
);

export const WishlistBook = model('Wishlist', wishlistBookSchema);
