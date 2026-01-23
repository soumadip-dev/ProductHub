// types.ts

// Base types from Drizzle schema
export interface User {
  id: string; // Clerk user ID
  email: string;
  name: string;
  imageUrl: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  productId: string;
  createdAt: Date | string;
}

// API Response types with relations
export interface UserWithRelations extends User {
  products?: ProductWithUser[];
  comments?: CommentWithUser[];
}

export interface ProductWithUser extends Product {
  user: User;
}

export interface ProductWithUserAndComments extends ProductWithUser {
  comments: CommentWithUser[];
}

export interface ProductWithRelations extends Product {
  user: User;
  comments: CommentWithUser[];
}

export interface CommentWithUser extends Comment {
  user: User;
}

// API Request types
export interface UserData {
  email: string;
  name?: string | null;
  imageUrl?: string | null;
}

export interface ProductData {
  title: string;
  description: string;
  imageUrl: string;
}

// API Response wrapper types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: ProductWithUser[]; // getAllProducts returns products with user
}

export interface SingleProductResponse {
  success: boolean;
  message: string;
  data: ProductWithRelations; // getProductById returns product with user and comments
}

export interface CreateProductResponse {
  success: boolean;
  message: string;
  data: Product; // createProduct returns just the product without relations
}

export interface UpdateProductResponse {
  success: boolean;
  message: string;
  data: Product; // updateProduct returns the updated product
}

export interface CreateCommentResponse {
  success: boolean;
  message: string;
  data: Comment; // createComment returns just the comment
}

export interface SyncUserResponse {
  success: boolean;
  message: string;
  data: User;
}

// For the useProducts hook
export interface UseProductsResult {
  data: ProductsResponse | null;
  isLoading: boolean;
  error: Error | null;
}

// For API parameters
export interface CreateCommentParams {
  productId: string;
  content: string;
}

export interface UpdateProductParams {
  id: string;
  productData: ProductData;
}

export interface DeleteCommentParams {
  commentId: string;
}
