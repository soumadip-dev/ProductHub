import { Link, useNavigate } from 'react-router';
import { useMyProducts, useDeleteProduct } from '../hooks/useProducts';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeftIcon, PlusIcon, PackageIcon, EyeIcon, EditIcon, Trash2Icon } from 'lucide-react';
import { useConfirmationModal } from '../hooks/useConfirmationModal';
import ConfirmationModal from '../components/ConfirmationModal';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { data: productsResponse, isLoading } = useMyProducts();
  const deleteProduct = useDeleteProduct();

  const { modalState, showConfirmation, hideConfirmation } = useConfirmationModal();

  const handleDelete = (id: string) => {
    showConfirmation({
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product? This action cannot be undone.',
      type: 'danger',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteProduct.mutate(id);
      },
    });
  };

  if (isLoading) return <LoadingSpinner />;

  const products = productsResponse?.data || [];

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="btn btn-ghost btn-sm gap-1">
              <ArrowLeftIcon className="size-4" /> Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold">My Products</h1>
              <p className="text-base-content/60 text-sm">Manage your listings</p>
            </div>
          </div>
          <Link to="/create" className="btn btn-primary btn-sm gap-1">
            <PlusIcon className="size-4" /> New
          </Link>
        </div>

        <div className="stats bg-base-300 w-full">
          <div className="stat">
            <div className="stat-title">Total Products</div>
            <div className="stat-value text-primary">{products.length}</div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="card bg-base-300">
            <div className="card-body items-center text-center py-16">
              <PackageIcon className="size-16 text-base-content/20" />
              <h3 className="card-title text-base-content/50">No products yet</h3>
              <p className="text-base-content/40 text-sm">Start by creating your first product</p>
              <Link to="/create" className="btn btn-primary btn-sm mt-4">
                Create Product
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {products.map(product => (
              <div key={product.id} className="card card-side bg-base-300">
                <figure className="w-32 shrink-0">
                  <img src={product.imageUrl} alt={product.title} className="h-full object-cover" />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-base">{product.title}</h2>
                  <p className="text-sm text-base-content/60 line-clamp-1">{product.description}</p>
                  <div className="card-actions justify-end mt-2">
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="btn btn-ghost btn-xs gap-1"
                    >
                      <EyeIcon className="size-3" /> View
                    </button>
                    <button
                      onClick={() => navigate(`/edit/${product.id}`)}
                      className="btn btn-ghost btn-xs gap-1"
                    >
                      <EditIcon className="size-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-ghost btn-xs text-error gap-1"
                      disabled={deleteProduct.isPending}
                    >
                      <Trash2Icon className="size-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={hideConfirmation}
        onConfirm={() => {
          modalState.onConfirm?.();
          hideConfirmation();
        }}
        title={modalState.title}
        message={modalState.message}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
        type={modalState.type}
        isLoading={deleteProduct.isPending}
      />
    </>
  );
}
