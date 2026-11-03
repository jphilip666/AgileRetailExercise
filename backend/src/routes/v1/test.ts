import express, { type Request, type Response, type NextFunction } from 'express';

const router = express.Router();

// get all items
router.get('/items', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'success',
        message: 'get all items',
    });
});

// get item
router.get('/items/:id', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'success',
        message: 'get item',
    });
});

// post item
router.post('/items', (req: Request, res: Response) => {
    res.status(201).send({
        status: 'success',
        message: 'create item',
    });
});

// update item
router.put('/items/:id', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'success',
        message: 'update item',
    });
});

// delete item
router.delete('/items/:id', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'success',
        message: 'delete item',
    });
});

export default router;
