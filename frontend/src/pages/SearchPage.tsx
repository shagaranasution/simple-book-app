import { useEffect, useMemo, useState } from 'react';
import BookCard from '../components/BookCard';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import useDebounce from '../hooks/useDebounce';
import { searchBooks } from '../services/booksApi';
import { addWishlist } from '../services/wishlistApi';
import { Book } from '../types/book';

interface SearchPageProps {
  wishlistIds: string[];
  onWishlistCreated: (book: Book) => void;
}

export default function SearchPage({
  wishlistIds,
  onWishlistCreated,
}: SearchPageProps) {
  const [query, setQuery] = useState('atomic habits');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittingId, setSubmittingId] = useState('');

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const normalizedQuery = debouncedQuery.trim();

    if (normalizedQuery.length < 2) {
      setBooks([]);
      setError('');
      return;
    }

    async function runSearch() {
      try {
        setLoading(true);
        setError('');
        const response = await searchBooks(normalizedQuery);
        setBooks(response);
      } catch (searchError) {
        setError(
          searchError instanceof Error
            ? searchError.message
            : 'Failed to load books'
        );
      } finally {
        setLoading(false);
      }
    }

    runSearch();
  }, [debouncedQuery]);

  const wishlistSet = useMemo(() => new Set(wishlistIds), [wishlistIds]);

  async function handleAddWishlist(book: Book) {
    try {
      setSubmittingId(book.googleBookId);
      const savedBook = await addWishlist(book);
      onWishlistCreated(savedBook);
    } catch (wishlistError) {
      setError(
        wishlistError instanceof Error
          ? wishlistError.message
          : 'Failed to save book'
      );
    } finally {
      setSubmittingId('');
    }
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <SearchBar value={query} onChange={setQuery} />
        <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
            Mini Project
          </p>
          <h2 className="mt-3 text-2xl font-bold">
            Search, discover, and save your next favorite book.
          </h2>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-3xl bg-slate-200"
            />
          ))}
        </div>
      ) : books.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {books.map((book) => (
            <BookCard
              key={book.googleBookId}
              book={book}
              isSaved={wishlistSet.has(book.googleBookId)}
              actionLabel={
                wishlistSet.has(book.googleBookId) ? 'Saved' : 'Add to Wishlist'
              }
              onAction={handleAddWishlist}
              actionDisabled={
                wishlistSet.has(book.googleBookId) ||
                submittingId === book.googleBookId
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Start searching for a book"
          description="Type at least 2 characters to see book recommendations from Google Books."
        />
      )}
    </section>
  );
}
