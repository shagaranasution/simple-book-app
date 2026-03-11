import { Book } from '../types/book';

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:3001/api';

export async function searchBooks(query: string): Promise<Book[]> {
  const response = await fetch(
    `${API_BASE_URL}/books/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    const errorData = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(errorData?.message || 'Failed to search books');
  }

  return response.json() as Promise<Book[]>;
}
