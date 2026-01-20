import { useCreateProduct } from '../hooks/useProducts';
import { ArrowLeftIcon, FileTextIcon, ImageIcon, SparklesIcon, TypeIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { createProductSchema, type CreateProductInput } from '../schemas/product.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

export default function CreatePage() {
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: '',
      imageUrl: '',
      description: '',
    },
  });

  const imageUrl = watch('imageUrl');

  const onSubmit = (data: CreateProductInput) => {
    createProductMutation.mutate(data, {
      onSuccess: () => navigate('/'),
    });
  };

  return (
    <div className="max-w-lg mx-auto">
      <Link to="/" className="btn btn-ghost btn-sm gap-1 mb-4">
        <ArrowLeftIcon className="size-4" /> Back
      </Link>

      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className="card-title">
            <SparklesIcon className="size-5 text-primary" />
            New Product
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="input input-bordered flex items-center gap-2 bg-base-200">
                    <TypeIcon className="size-4 text-base-content/50" />
                    <input {...field} type="text" placeholder="Product title" className="grow" />
                  </label>
                  {errors.title && (
                    <p className="text-error text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="input input-bordered flex items-center gap-2 bg-base-200">
                    <ImageIcon className="size-4 text-base-content/50" />
                    <input {...field} type="url" placeholder="Image URL" className="grow" />
                  </label>
                  {errors.imageUrl && (
                    <p className="text-error text-sm mt-1">{errors.imageUrl.message}</p>
                  )}
                </div>
              )}
            />

            {imageUrl && (
              <div className="rounded-box overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-40 object-cover"
                  onError={e => ((e.target as HTMLImageElement).style.display = 'none')}
                />
              </div>
            )}

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                    <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                    <textarea
                      {...field}
                      placeholder="Description"
                      className="grow bg-transparent resize-none focus:outline-none min-h-24"
                    />
                  </div>
                  {errors.description && (
                    <p className="text-error text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>
              )}
            />

            {createProductMutation.isError && (
              <div role="alert" className="alert alert-error alert-sm">
                <span>Failed to create. Try again.</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={createProductMutation.isPending}
            >
              {createProductMutation.isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                'Create Product'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
