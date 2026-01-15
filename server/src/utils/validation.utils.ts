import Joi, { type ValidationResult } from 'joi';

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

interface CommentData {
  content: string;
  userId: string;
  productId: string;
}

const validateUser = (data: Partial<UserData>) => {
  const schema = Joi.object<UserData>({
    email: Joi.string().email().required(),
    name: Joi.string().allow(null).allow(null, ''),
    imageUrl: Joi.string().allow(null).allow(null, ''),
  });
  return schema.validate(data);
};

const validateProductCreate = (data: Partial<ProductData>): ValidationResult => {
  const schema = Joi.object<ProductData>({
    title: Joi.string().min(1).max(200).required(),
    description: Joi.string().min(1).max(2000).required(),
    imageUrl: Joi.string().uri().required(),
  });

  return schema.validate(data);
};

const validateProductUpdate = (data: Partial<ProductData>): ValidationResult => {
  const schema = Joi.object<ProductData>({
    title: Joi.string().min(1).max(200).optional(),
    description: Joi.string().min(1).max(2000).optional(),
    imageUrl: Joi.string().uri().optional(),
  });

  return schema.validate(data, { stripUnknown: true });
};

export { validateUser, validateProductCreate, validateProductUpdate };
