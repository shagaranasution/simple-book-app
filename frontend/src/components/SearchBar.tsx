interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
      <label
        htmlFor="book-search"
        className="mb-3 block text-sm font-semibold text-slate-700">
        Search books by keyword
      </label>
      <input
        id="book-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by title..."
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
      />
      <p className="mt-3 text-xs text-slate-500">
        Search starts automatically when you type at least 2 characters.
      </p>
    </div>
  );
}
