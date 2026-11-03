import { db } from '@/lib/prisma.js';
import { type Product } from '@/generated/prisma/client.js';
import { type CreateProductInput, type UpdateProductInput } from '@/types/productType.js';

const getAllProducts = async (): Promise<Product[]> => {
    const allProducts = await db.product.findMany();
    return allProducts;
};

const getProductById = async (id: string): Promise<Product | null> => {
    const product = await db.product.findUnique({
        where: {
            id: id,
        },
    });
    return product;
};

const createProduct = async (data: CreateProductInput): Promise<Product> => {
    const product = await db.product.create({
        data: {
            name: data.name,
            description: data.description ?? null,
            price: data.price,
            stock: data.stock,
            isActive: data.isActive,
        },
    });
    return product;
};

const updateProductById = async (id: string, data: UpdateProductInput): Promise<Product> => {
    const product = await db.product.update({
        data: {
            name: data.name,
            description: data.description ?? null,
            price: data.price,
            stock: data.stock,
            isActive: data.isActive,
        },
        where: {
            id: id,
        },
    });
    return product;
};

const deleteProductById = async (id: string): Promise<Product> => {
    const product = await db.product.delete({
        where: {
            id: id,
        },
    });
    return product;
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
};
