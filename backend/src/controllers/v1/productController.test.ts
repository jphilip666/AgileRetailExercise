import { type Request, type Response, type NextFunction } from 'express';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import productController from '@/controllers/v1/productController.js';
import productService from '@/services/v1/productService.js';

// Mock the product service
vi.mock('@/services/v1/productService.js', () => ({
    default: {
        getAllProducts: vi.fn(),
        getProductById: vi.fn(),
        createProduct: vi.fn(),
        updateProductById: vi.fn(),
        deleteProductById: vi.fn(),
    },
}));

describe('Product Controller', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        vi.clearAllMocks();

        req = {} as Request;

        res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        } as unknown as Response;

        next = vi.fn();
    });

    describe('getAllProducts', () => {
        it('should return all products with status 200', async () => {
            const mockProducts = [
                { id: '1', name: 'Laptop', price: 999 },
                { id: '2', name: 'Keyboard', price: 50 },
            ];

            vi.mocked(productService.getAllProducts).mockResolvedValue(mockProducts as never);

            await productController.getAllProducts(req, res, next);

            expect(productService.getAllProducts).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.send).toHaveBeenCalledWith({
                status: 'success',
                data: mockProducts,
            });

            expect(next).not.toHaveBeenCalled();
        });
    });
});
