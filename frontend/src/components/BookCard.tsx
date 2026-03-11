import { Book } from '../types/book';
import StarRating from './StarRating';

interface BookCardProps {
  book: Book;
  isSaved: boolean;
  actionLabel: string;
  onAction: (book: Book) => void;
  actionDisabled?: boolean;
}

export default function BookCard({
  book,
  isSaved,
  actionLabel,
  onAction,
  actionDisabled = false,
}: BookCardProps) {
  return (
    <article className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft sm:grid-cols-[128px,1fr]">
      <img
        src={book.thumbnail}
        alt={book.title}
        className="h-52 w-full rounded-2xl object-cover sm:h-full sm:w-32"
        loading="lazy"
      />

      <div className="flex min-w-0 flex-col">
        <div className="flex flex-1 flex-col gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-600">
              {book.publishedDate}
            </p>
            <h3 className="mt-1 line-clamp-2 text-xl font-bold text-slate-900">
              {book.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              by {book.authors.join(', ')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StarRating rating={book.averageRating} />
            <span className="text-xs text-slate-500">
              {book.ratingsCount} ratings
            </span>
          </div>

          <p className="line-clamp-3 text-sm leading-6 text-slate-600">
            {book.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          {isSaved ? (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Already in wishlist
            </span>
          ) : (
            <span className="text-xs text-slate-400">
              Save this book for later reading.
            </span>
          )}

          <button
            type="button"
            onClick={() => onAction(book)}
            disabled={actionDisabled}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300">
            {actionLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
