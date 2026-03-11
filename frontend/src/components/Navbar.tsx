import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-slate-900 text-white'
        : 'text-slate-700 hover:bg-slate-200',
    ].join(' ');

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-bold text-slate-900">
          Book App
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClass} end>
            Search
          </NavLink>
          <NavLink to="/wishlist" className={navLinkClass}>
            Wishlist
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
