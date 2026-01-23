import { useNavigate, useParams, Link } from 'react-router';
import { useAuth } from '@clerk/clerk-react';
import { useProduct, useUpdateProduct } from '../hooks/useProducts';
import { LoadingSpinner } from '../components/LoadingSpinner';
import EditProductForm from '../components/EditProductForm';

export default function EditPage() {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading } = useProduct(id!);
  const updateProductMutation = useUpdateProduct();

  if (isLoading) return <LoadingSpinner />;

  if (!product || product.userId !== userId) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">{!product ? 'Not found' : 'Access denied'}</h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (data: { title: string; description: string; imageUrl: string }) => {
    updateProductMutation.mutate(
      {
        id: product.id,
        productData: data,
      },
      {
        onSuccess: () => navigate('/profile'),
      }
    );
  };

  return (
    <EditProductForm
      product={product}
      isPending={updateProductMutation.isPending}
      isError={updateProductMutation.isError}
      onSubmit={handleSubmit}
    />
  );
}
