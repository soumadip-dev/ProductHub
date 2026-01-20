import { SignInButton } from '@clerk/clerk-react';
import { PackageIcon, SparklesIcon } from 'lucide-react';
import { Link } from 'react-router';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { ProductWithUser } from '../types';

export default function HomePage() {
  const { data, isLoading, error } = useProducts();
  const products: ProductWithUser[] = data?.data ?? [];

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>Something went wrong. Please refresh the page.</span>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="hero bg-gradient-to-br from-base-300 via-base-200 to-base-300/70 rounded-2xl overflow-hidden border border-base-300 shadow-lg">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10 py-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-500" />
            <img
              src="/Image.png"
              alt="Creator"
              className="relative h-64 lg:h-72 rounded-2xl shadow-2xl"
            />
          </div>
          <div className="text-center lg:text-left max-w-lg">
            <div className="mb-3">
              <span className="badge badge-primary badge-lg font-semibold px-4 py-2">
                New Platform
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Share Your{' '}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="py-6 text-md text-base-content/70 leading-relaxed">
              Upload, discover, and connect with creators worldwide. Showcase your work to the right
              audience.
            </p>
            <SignInButton mode="modal">
              <button className="btn btn-primary btn-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                <SparklesIcon className="size-5" />
                Start Selling
                <span className="opacity-80 ml-1 text-sm">→</span>
              </button>
            </SignInButton>
            <p className="mt-4 text-sm text-base-content/40">
              No credit card required • Get started in seconds
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <PackageIcon className="size-6 text-primary" />
            </div>
            All Products
            <span className="badge badge-outline badge-sm font-normal ml-2">
              {products.length} items
            </span>
          </h2>
          {products && products.length > 0 && (
            <Link to="/create" className="btn btn-outline btn-sm">
              + Add Product
            </Link>
          )}
        </div>

        {products.length === 0 ? (
          <div className="card bg-base-300">
            <div className="card-body items-center text-center py-16">
              <PackageIcon className="size-16 text-base-content/20" />
              <h3 className="card-title text-base-content/50">No products yet</h3>
              <p className="text-base-content/40 text-sm">Be the first to share something!</p>
              <Link to="/create" className="btn btn-primary btn-sm mt-2">
                Create Product
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product: ProductWithUser) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
