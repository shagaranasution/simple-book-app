import { BookItem } from '../types/book.js';

const PLACEHOLDER_IMAGE = 'https://placehold.co/128x192?text=No+Image';

function normalizeBook(item: any): BookItem {
  const volumeInfo = item?.volumeInfo ?? {};
  const imageLinks = volumeInfo.imageLinks ?? {};

  return {
    googleBookId: item.id,
    title: volumeInfo.title || 'Untitled',
    authors:
      Array.isArray(volumeInfo.authors) && volumeInfo.authors.length > 0
        ? volumeInfo.authors
        : ['Unknown Author'],
    thumbnail:
      imageLinks.thumbnail || imageLinks.smallThumbnail || PLACEHOLDER_IMAGE,
    averageRating:
      typeof volumeInfo.averageRating === 'number'
        ? volumeInfo.averageRating
        : 0,
    ratingsCount:
      typeof volumeInfo.ratingsCount === 'number' ? volumeInfo.ratingsCount : 0,
    publishedDate: volumeInfo.publishedDate || 'Unknown',
    description: volumeInfo.description || 'No description available.',
  };
}

export async function searchGoogleBooks(query: string): Promise<BookItem[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery || trimmedQuery.length < 2) {
    throw new Error('Query must contain at least 2 characters');
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(trimmedQuery)}&maxResults=40&key=AIzaSyB4MAasHlqFjSrbo92FHHQv_V8VFdEXE5E`;
  const response = await fetch(url);
  console.log('response:', response);
  if (!response.ok) {
    throw new Error('Failed to fetch data from Google Books');
  }

  const data = await response.json();
  const items = Array.isArray(data.items) ? data.items : [];

  return items.map(normalizeBook);
}
