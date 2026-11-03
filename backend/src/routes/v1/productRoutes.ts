import express from 'express';
import itemController from '@/controllers/v1/productController.js';
import { createProductSchema, updateProductSchema, productIdSchema } from '@myapp/schemas';
import { validateRequest } from '@/middleware/validateRequest.js';

const router = express.Router();

// get all items
router.get('/', itemController.getAllProducts);

// get item
router.get('/:id', validateRequest(productIdSchema, 'params'), itemController.getProductById);

// post item
router.post('/', validateRequest(createProductSchema, 'body'), itemController.createProduct);

// update item
router.put(
    '/:id',
    validateRequest(productIdSchema, 'params'),
    validateRequest(updateProductSchema, 'body'),
    itemController.updateProductById,
);

// delete item
router.delete('/:id', validateRequest(productIdSchema, 'params'), itemController.deleteProductById);

export default router;
