import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
} from '../lib/api';

function useProducts() {
  const result = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
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

function useMyProducts() {
  return useQuery({
    queryKey: ['myProducts'],
    queryFn: getMyProducts,
  });
}
function useDeleteProduct() {
  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
    },
  });
  return deleteProductMutation;
}

export { useProducts, useCreateProduct, useProduct, useDeleteProduct, useMyProducts };
