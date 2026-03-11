import { Book } from '../types/book';

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:3001/api';

export async function getWishlist(): Promise<Book[]> {
  const response = await fetch(`${API_BASE_URL}/wishlist`);

  if (!response.ok) {
    const errorData = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(errorData?.message || 'Failed to fetch wishlist');
  }

  return response.json() as Promise<Book[]>;
}

export async function addWishlist(book: Book): Promise<Book> {
  const response = await fetch(`${API_BASE_URL}/wishlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(errorData?.message || 'Failed to add book to wishlist');
  }

  return response.json() as Promise<Book>;
}

export async function removeWishlist(
  googleBookId: string
): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/wishlist/${googleBookId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(
      errorData?.message || 'Failed to remove book from wishlist'
    );
  }

  return response.json() as Promise<{ message: string }>;
}
