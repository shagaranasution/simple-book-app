import { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import WishlistPage from './pages/WishlistPage';
import { getWishlist, removeWishlist } from './services/wishlistApi';
import { Book } from './types/book';

function App() {
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    async function loadWishlist() {
      try {
        setLoadingWishlist(true);
        const response = await getWishlist();
        setWishlist(response);
      } catch (wishlistError) {
        setError(
          wishlistError instanceof Error
            ? wishlistError.message
            : 'Failed to load wishlist'
        );
      } finally {
        setLoadingWishlist(false);
      }
    }

    loadWishlist();
  }, []);

  const wishlistIds = useMemo(
    () => wishlist.map((book) => book.googleBookId),
    [wishlist]
  );

  function handleWishlistCreated(book: Book) {
    setWishlist((current) => [
      book,
      ...current.filter((item) => item.googleBookId !== book.googleBookId),
    ]);
  }

  async function handleRemove(book: Book) {
    try {
      setDeletingId(book.googleBookId);
      await removeWishlist(book.googleBookId);
      setWishlist((current) =>
        current.filter((item) => item.googleBookId !== book.googleBookId)
      );
    } catch (removeError) {
      setError(
        removeError instanceof Error
          ? removeError.message
          : 'Failed to remove book'
      );
    } finally {
      setDeletingId('');
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {loadingWishlist ? (
          <div className="rounded-3xl bg-white p-8 shadow-soft">
            <p className="text-sm text-slate-500">Loading wishlist...</p>
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <SearchPage
                  wishlistIds={wishlistIds}
                  onWishlistCreated={handleWishlistCreated}
                />
              }
            />
            <Route
              path="/wishlist"
              element={
                <WishlistPage
                  wishlist={wishlist}
                  onRemove={handleRemove}
                  deletingId={deletingId}
                />
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
