export interface Book {
  _id?: string;
  googleBookId: string;
  title: string;
  authors: string[];
  thumbnail: string;
  averageRating: number;
  ratingsCount: number;
  publishedDate: string;
  description: string;
}
