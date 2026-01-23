import { useMutation, useQuery } from '@tanstack/react-query';
import { createProduct, deleteProduct, getAllProducts, getProductById } from '../lib/api';

function useProducts() {
  const result = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    gcTime: 0,
    refetchInterval: 1000 * 10,
  });

  return result;
}

function useCreateProduct() {
  const createProductMutation = useMutation({ mutationFn: createProduct });
  return createProductMutation;
}

function useProduct(id: string) {
  const result = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id, // double bang operator to convert string to boolean
  });
  return result;
}
function useDeleteProduct() {
  const deleteProductMutation = useMutation({ mutationFn: deleteProduct });
  return deleteProductMutation;
}
export { useProducts, useCreateProduct, useProduct, useDeleteProduct };
