import { useAuth } from '@clerk/clerk-react';
import { Link, useNavigate, useParams } from 'react-router';
import { useProduct } from '../hooks/useProducts';
import { ArrowLeftIcon, EditIcon } from 'lucide-react';

export default function ProductPage() {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProduct(id as string);

  const isOwner = product?.userId === userId;
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="btn btn-ghost btn-sm gap-1">
          <ArrowLeftIcon className="size-4" /> Back
        </Link>
      </div>
    </div>
  );
}
