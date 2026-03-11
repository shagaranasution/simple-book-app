import { Book } from '../types/book';
import StarRating from './StarRating';

interface BookCardProps {
  book: Book;
  isWishlisted?: boolean;
  onToggleWishlist?: (book: Book) => void;
  isWishlistLoading?: boolean;
}

export default function BookCard({
  book,
  isWishlisted = false,
  onToggleWishlist,
  isWishlistLoading = false,
}: BookCardProps) {
  const authorText =
    book.authors.length > 0 ? book.authors.join(', ') : 'Unknown Author';

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="aspect-[3/4] w-full bg-slate-100">
        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={book.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-slate-400">
            No image available
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="line-clamp-2 text-base font-semibold text-slate-900">
          {book.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{authorText}</p>

        <div className="mt-3">
          <StarRating rating={book.averageRating} />
        </div>

        <p className="mt-2 text-xs text-slate-500">
          {book.ratingsCount > 0
            ? `${book.ratingsCount} ratings`
            : 'No ratings count'}
        </p>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => onToggleWishlist?.(book)}
            disabled={isWishlistLoading}
            className={[
              'w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition',
              isWishlisted
                ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                : 'bg-slate-900 text-white hover:bg-slate-800',
              isWishlistLoading ? 'cursor-not-allowed opacity-60' : '',
            ].join(' ')}>
            {isWishlistLoading
              ? 'Please wait...'
              : isWishlisted
                ? 'Remove from Wishlist'
                : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </article>
  );
}
