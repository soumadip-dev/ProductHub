import type {
  CreateCommentResponse,
  CreateProductResponse,
  ProductsResponse,
  ProductWithRelations,
  SyncUserResponse,
  UserData,
  ProductData,
} from '../types';
import axiosInstance from '../utils/axiosInstance';

// Users API
export const syncUser = async (userData: UserData): Promise<SyncUserResponse> => {
  const response = await axiosInstance.post('/users/sync', userData);
  return response.data;
};

// Products API
export const getAllProducts = async (): Promise<ProductsResponse> => {
  const { data } = await axiosInstance.get('/products');
  return data;
};

export const getProductById = async (id: string): Promise<ProductWithRelations> => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data.data; // Assuming your API returns { success, message, data }
};

export const getMyProducts = async (): Promise<ProductsResponse> => {
  const { data } = await axiosInstance.get('/products/my');
  return data;
};

export const createProduct = async (productData: ProductData): Promise<CreateProductResponse> => {
  const { data } = await axiosInstance.post('/products', productData);
  return data;
};

export const updateProduct = async ({
  id,
  ...productData
}: {
  id: string;
  productData: ProductData;
}): Promise<CreateProductResponse> => {
  const { data } = await axiosInstance.put(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id: string): Promise<{ success: boolean; message: string }> => {
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
}): Promise<CreateCommentResponse> => {
  const { data } = await axiosInstance.post(`/comments/${productId}`, { content });
  return data;
};

export const deleteComment = async ({
  commentId,
}: {
  commentId: string;
}): Promise<{ success: boolean; message: string }> => {
  const { data } = await axiosInstance.delete(`/comments/${commentId}`);
  return data;
};
