import BookCard from '../components/BookCard';
import EmptyState from '../components/EmptyState';
import { Book } from '../types/book';

interface WishlistPageProps {
  wishlist: Book[];
  onRemove: (book: Book) => void;
  deletingId: string;
}

export default function WishlistPage({
  wishlist,
  onRemove,
  deletingId,
}: WishlistPageProps) {
  if (wishlist.length === 0) {
    return (
      <EmptyState
        title="Your wishlist is still empty"
        description="Books you save from the search page will appear here."
      />
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
          Saved books
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          Wishlist Collection
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          All books below are stored in MongoDB and can be managed from this
          page.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {wishlist.map((book) => (
          <BookCard
            key={book.googleBookId}
            book={book}
            isSaved
            actionLabel={
              deletingId === book.googleBookId ? 'Removing...' : 'Remove'
            }
            onAction={onRemove}
            actionDisabled={deletingId === book.googleBookId}
          />
        ))}
      </div>
    </section>
  );
}
