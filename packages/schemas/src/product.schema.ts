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
    
export const productIdSchema = z.object({
    id: productFields.id,
});

export type ProductIdInput = z.infer<typeof productIdSchema>;
export type CreateProductInput = z.input<typeof createProductSchema>;
export type CreateProductData = z.output<typeof createProductSchema>;
export type UpdateProductInput = z.input<typeof updateProductSchema>;
export type UpdateProductData = z.input<typeof updateProductSchema>;
