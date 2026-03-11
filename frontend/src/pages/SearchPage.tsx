import { useMemo, useState } from 'react';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import { searchBooks } from '../services/booksApi';
import { Book } from '../types/book';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSearch() {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setBooks([]);
      setHasSearched(false);
      setErrorMessage('');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      setHasSearched(true);

      const results = await searchBooks(trimmedQuery);
      setBooks(results);
    } catch (error) {
      setBooks([]);
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong'
      );
    } finally {
      setIsLoading(false);
    }
  }

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
          Searching books...
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center text-sm text-rose-700 shadow-sm">
          {errorMessage}
        </div>
      );
    }

    if (!hasSearched) {
      return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
          Start by searching for a book title, author, or keyword.
        </div>
      );
    }

    if (books.length === 0) {
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
          No books found for your search.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCard
            key={book.googleBookId}
            book={book}
            onToggleWishlist={(selectedBook) => {
              console.log(
                'Wishlist action will be implemented next:',
                selectedBook
              );
            }}
          />
        ))}
      </div>
    );
  }, [books, errorMessage, hasSearched, isLoading]);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Search Books</h1>
        <p className="mt-2 text-sm text-slate-600">
          Find books from Google Books and save your favorites into wishlist.
        </p>
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={handleSearch}
        isLoading={isLoading}
      />

      {content}
    </section>
  );
}
