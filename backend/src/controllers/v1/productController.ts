import type { Request, Response, NextFunction } from 'express';
import productService from '@/services/v1/productService.js';

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
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
};
