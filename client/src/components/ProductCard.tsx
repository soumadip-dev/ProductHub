import { Link } from 'react-router';
import type { ProductWithUser } from '../types';

const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

interface ProductCardProps {
  product: ProductWithUser;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew = new Date(product.createdAt) > oneWeekAgo;

  const userName = product.user?.name || 'Unknown User';
  const userImageUrl = product.user?.imageUrl || '/default-avatar.png';

  return (
    <Link
      to={`/product/${product.id}`}
      className="card bg-base-300 hover:bg-base-200 transition-colors"
    >
      <figure className="px-4 pt-4">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="rounded-xl h-40 w-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base">
          {product.title}
          {isNew && <span className="badge badge-secondary badge-sm">NEW</span>}
        </h2>
        <p className="text-sm text-base-content/70 line-clamp-2">{product.description}</p>

        <div className="divider my-1"></div>

        <div className="flex items-center justify-between">
          {/* Always show user info since product always has user relation */}
          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="w-6 rounded-full ring-1 ring-primary">
                <img
                  src={userImageUrl}
                  alt={userName}
                  onError={e => {
                    e.currentTarget.src = '/default-avatar.png';
                  }}
                />
              </div>
            </div>
            <span className="text-xs text-base-content/60">{userName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
