import { db } from './index';
import { eq } from 'drizzle-orm';
import {
  users,
  comments,
  products,
  type NewUser,
  type NewComment,
  type NewProduct,
} from './schema';

//* USER QUERIES

export async function createUser(userData: NewUser) {
  const [user] = await db.insert(users).values(userData).returning();
  return user;
}

export async function getUserById(id: string) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
}

export async function updateUser(id: string, updates: Partial<NewUser>) {
  const [user] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
  return user;
}

export async function upsertUser(userData: NewUser) {
  const existineUser = await getUserById(userData.id);
  if (existineUser) {
    return updateUser(userData.id, userData);
  }
  return createUser(userData);
}

//* PRODUCT QUERIES

export async function createProduct(productData: NewProduct) {}

export async function getAllProducts() {}

export async function getProductById(id: string) {}

export async function getProductByUserId(userId: string) {}

export async function updateProduct(id: string, updates: Partial<NewProduct>) {}

export async function deleteProduct(id: string) {}

//* COMMENT QUERIES

export async function createComment(commentData: NewComment) {}

export async function getCommentById(id: string) {}

export async function deleteComment(id: string) {}
