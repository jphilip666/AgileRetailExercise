import express from 'express';
import productController from '@/controllers/v1/productController.js';
import { createProductSchema, updateProductSchema, productIdSchema } from '@myapp/schemas';
import { validateRequest } from '@/middleware/validateRequest.js';

const router = express.Router();

// get all items
router.get('/pagination', productController.getPaginationProducts);

// get all items
router.get('/', productController.getAllProducts);

// get item
router.get('/:id', validateRequest(productIdSchema, 'params'), productController.getProductById);

// post item
router.post('/', validateRequest(createProductSchema, 'body'), productController.createProduct);

// update item
router.put(
    '/:id',
    validateRequest(productIdSchema, 'params'),
    validateRequest(updateProductSchema, 'body'),
    productController.updateProductById,
);

// delete item
router.delete('/:id', validateRequest(productIdSchema, 'params'), productController.deleteProductById);

export default router;
