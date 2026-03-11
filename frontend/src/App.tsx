import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import WishlistPage from './pages/WishlistPage';
import {
  addWishlist,
  getWishlist,
  removeWishlist,
} from './services/wishlistApi';
import { Book } from './types/book';

export default function App() {
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [wishlistErrorMessage, setWishlistErrorMessage] = useState('');
  const [activeWishlistBookId, setActiveWishlistBookId] = useState<
    string | null
  >(null);

  const loadWishlist = useCallback(async () => {
    try {
      setWishlistErrorMessage('');
      const data = await getWishlist();
      setWishlist(data);
    } catch (error) {
      setWishlistErrorMessage(
        error instanceof Error ? error.message : 'Failed to load wishlist'
      );
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadWishlist();
  }, [loadWishlist]);

  const handleToggleWishlist = useCallback(
    async (book: Book) => {
      try {
        setActiveWishlistBookId(book.googleBookId);
        setWishlistErrorMessage('');

        const alreadyWishlisted = wishlist.some(
          (wishlistBook) => wishlistBook.googleBookId === book.googleBookId
        );

        if (alreadyWishlisted) {
          await removeWishlist(book.googleBookId);
          setWishlist((prev) =>
            prev.filter(
              (wishlistBook) => wishlistBook.googleBookId !== book.googleBookId
            )
          );
        } else {
          const createdBook = await addWishlist(book);
          setWishlist((prev) => [createdBook, ...prev]);
        }
      } catch (error) {
        setWishlistErrorMessage(
          error instanceof Error ? error.message : 'Failed to update wishlist'
        );
      } finally {
        setActiveWishlistBookId(null);
      }
    },
    [wishlist]
  );

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="mx-auto max-w-6xl px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <SearchPage
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  activeWishlistBookId={activeWishlistBookId}
                />
              }
            />
            <Route
              path="/wishlist"
              element={
                <WishlistPage
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  activeWishlistBookId={activeWishlistBookId}
                  isInitialLoading={isInitialLoading}
                  errorMessage={wishlistErrorMessage}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
