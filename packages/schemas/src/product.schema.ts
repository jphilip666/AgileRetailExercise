import { z } from 'zod';

export const productFields = {
    id: z.uuidv4(),
    name: z.string().trim().min(1, 'Product name is required'),
    description: z.string().trim().max(100).nullable(),
    price: z.coerce.number().positive(),
    stock: z.coerce.number().nonnegative(),
    isActive: z.boolean()
};

export const createProductSchema = z.object({
    name: productFields.name,
    description: productFields.description.optional(),
    price: productFields.price,
    stock: productFields.stock,
    isActive: productFields.isActive,
});

export const updateProductSchema = z.object({
    name: productFields.name,
    description: productFields.description.optional(),
    price: productFields.price,
    stock: productFields.stock,
    isActive: productFields.isActive,
});

export const deleteProductSchema = z.object({
    id: productFields.id,
});
    
export const productIdSchema = z.object({
    id: productFields.id,
});