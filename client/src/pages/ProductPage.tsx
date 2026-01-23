import { ArrowLeftIcon, EditIcon, Trash2Icon, CalendarIcon, UserIcon } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import CommentsSection from '../components/CommentsSection';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAuth } from '@clerk/clerk-react';
import { useProduct, useDeleteProduct } from '../hooks/useProducts';
import { useParams, Link, useNavigate } from 'react-router';
import { useConfirmationModal } from '../hooks/useConfirmationModal';
import type { ProductWithUserAndComments } from '../types';

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProduct(id!);
  const deleteProduct = useDeleteProduct();

  const { modalState, showConfirmation, hideConfirmation } = useConfirmationModal();

  const handleDelete = () => {
    showConfirmation({
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product? This action cannot be undone.',
      type: 'danger',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteProduct.mutate(id!, {
          onSuccess: () => navigate('/'),
        });
      },
    });
  };

  if (isLoading) return <LoadingSpinner />;

  if (error || !product) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Product not found</h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const typedProduct = product as ProductWithUserAndComments;
  const isOwner = userId === typedProduct.userId;

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="btn btn-ghost btn-sm gap-1">
            <ArrowLeftIcon className="size-4" /> Back
          </Link>
          {isOwner && (
            <div className="flex gap-2">
              <Link to={`/edit/${typedProduct.id}`} className="btn btn-ghost btn-sm gap-1">
                <EditIcon className="size-4" /> Edit
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-error btn-sm gap-1"
                disabled={deleteProduct.isPending}
              >
                {deleteProduct.isPending ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <Trash2Icon className="size-4" />
                )}
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card bg-base-300">
            <figure className="p-4">
              <img
                src={typedProduct.imageUrl}
                alt={typedProduct.title}
                className="rounded-xl w-full h-80 object-cover"
              />
            </figure>
          </div>

          <div className="card bg-base-300">
            <div className="card-body">
              <h1 className="card-title text-2xl line-clamp-1">{typedProduct.title}</h1>

              <div className="flex flex-wrap gap-4 text-sm text-base-content/60 my-2">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="size-4" />
                  {new Date(typedProduct.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <UserIcon className="size-4" />
                  {typedProduct.user?.name}
                </div>
              </div>

              <div className="divider my-2"></div>

              <p className="text-base-content/80 leading-relaxed">{typedProduct.description}</p>

              {typedProduct.user && (
                <>
                  <div className="divider my-2"></div>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={typedProduct.user.imageUrl} alt={typedProduct.user.name} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{typedProduct.user.name}</p>
                      <p className="text-xs text-base-content/50">Creator</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="card bg-base-300">
          <div className="card-body">
            <CommentsSection
              productId={id!}
              comments={typedProduct?.comments}
              currentUserId={userId}
            />
          </div>
        </div>
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

export default ProductPage;
