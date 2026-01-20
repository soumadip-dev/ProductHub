import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../lib/api';

export const useProducts = () => {
  const result = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    gcTime: 0,
    refetchInterval: 1000 * 10,
  });

  return result;
};
