import axiosInstance from '../utils/axiosInstance';

interface UserData {
  email: string;
  name?: string | null;
  imageUrl?: string | null;
}

interface ProductData {
  title: string;
  description: string;
  imageUrl: string;
}

// Users API
export const syncUser = async (userData: UserData) => {
  const response = await axiosInstance.post('/users/sync', userData);
  return response.data;
};

// Products API
export const getAllProducts = async () => {
  const { data } = await axiosInstance.get('/products');
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data;
};

export const getMyProducts = async () => {
  const { data } = await axiosInstance.get('/products/my');
  return data;
};

export const createProduct = async (productData: ProductData) => {
  const { data } = await axiosInstance.post('/products', productData);
  return data;
};

export const updateProduct = async ({
  id,
  ...productData
}: {
  id: string;
  productData: ProductData;
}) => {
  const { data } = await axiosInstance.put(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await axiosInstance.delete(`/products/${id}`);
  return data;
};

// Comments API
export const createComment = async ({
  productId,
  content,
}: {
  productId: string;
  content: string;
}) => {
  const { data } = await axiosInstance.post(`/comments/${productId}`, { content });
  return data;
};

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  const { data } = await axiosInstance.delete(`/comments/${commentId}`);
  return data;
};
