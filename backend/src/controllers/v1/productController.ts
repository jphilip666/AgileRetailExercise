import type { Request, Response, NextFunction } from 'express';
import productService from '@/services/v1/productService.js';

const getPaginationProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
        const skip = (page - 1) * limit;
        const sortBy: string = req.query.sortBy as string;
        const sortOrder: string = req.query.sortOrder as string;
        const search = String(req.query.search || '').trim();

        const { products, total, totalPages } = await productService.getPaginationProducts({
            page,
            limit,
            skip,
            sortBy,
            sortOrder,
            search,
        });

        res.status(200).json({
            message: 'Products retrieved successfully',
            data: products,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const allProducts = await productService.getAllProducts();

        res.status(200).send({
            status: 'success',
            data: allProducts,
        });
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: string = req.params.id as string;

        const product = await productService.getProductById(id);

        res.status(200).send({
            status: 'success',
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = req.body;
        const product = await productService.createProduct(data);

        res.status(201).send({
            status: 'success',
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

const updateProductById = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const id: string = req.params.id as string;

        const data = req.body;
        const product = await productService.updateProductById(id, data);

        res.status(200).send({
            status: 'success',
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

const deleteProductById = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const id: string = req.params.id as string;

        const product = await productService.deleteProductById(id);

        res.status(200).send({
            status: 'success',
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    getPaginationProducts,
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
};
