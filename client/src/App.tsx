import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import CreatePage from './pages/CreatePage';
import EditProductPage from './pages/EditProductPage';
import useAuthReq from './hooks/useAuthReq';
import useUserSync from './hooks/useUserSync';
import { Loader } from 'lucide-react';

export default function App() {
  const { isClerkLoaded } = useAuthReq();
  useUserSync();

  if (!isClerkLoaded)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
        </Routes>
      </main>
    </div>
  );
}
