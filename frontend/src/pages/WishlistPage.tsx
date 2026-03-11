import BookCard from '../components/BookCard';
import { Book } from '../types/book';

interface WishlistPageProps {
  wishlist: Book[];
  onToggleWishlist: (book: Book) => Promise<void>;
  activeWishlistBookId: string | null;
  isInitialLoading: boolean;
  errorMessage: string;
}

export default function WishlistPage({
  wishlist,
  onToggleWishlist,
  activeWishlistBookId,
  isInitialLoading,
  errorMessage,
}: WishlistPageProps) {
  let content: React.ReactNode;

  if (isInitialLoading) {
    content = (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
        Loading wishlist...
      </div>
    );
  } else if (errorMessage) {
    content = (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center text-sm text-rose-700 shadow-sm">
        {errorMessage}
      </div>
    );
  } else if (wishlist.length === 0) {
    content = (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
        Your wishlist is empty. Search for books and save the ones you like.
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((book) => (
          <BookCard
            key={book.googleBookId}
            book={book}
            isWishlisted
            isWishlistLoading={activeWishlistBookId === book.googleBookId}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Wishlist</h1>
        <p className="mt-2 text-sm text-slate-600">
          Books saved to your personal reading wishlist.
        </p>
      </div>

      {content}
    </section>
  );
}
