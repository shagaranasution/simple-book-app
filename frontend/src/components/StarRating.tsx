interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  const roundedRating = Math.round(rating);
  const stars = Array.from({ length: 5 }, (_, index) => index < roundedRating);

  return (
    <div className="flex items-center gap-1">
      {stars.map((isFilled, index) => (
        <span
          key={index}
          className={isFilled ? 'text-amber-400' : 'text-slate-300'}
          aria-hidden="true">
          ★
        </span>
      ))}
      <span className="ml-1 text-xs text-slate-500">
        {rating > 0 ? rating.toFixed(1) : 'No rating'}
      </span>
    </div>
  );
}
