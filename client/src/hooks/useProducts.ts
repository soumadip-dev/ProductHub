import { useMutation, useQuery } from '@tanstack/react-query';
import { createProduct, getAllProducts } from '../lib/api';

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

export { useProducts, useCreateProduct };
