import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import WishlistPage from './pages/WishlistPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="mx-auto max-w-6xl px-4 py-8">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
