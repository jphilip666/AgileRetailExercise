import express, { type Request, type Response, type NextFunction } from 'express';

const router = express.Router();

// define the home page route
router.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'success',
    });
});

// define the about route
router.get('/about', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'success',
    });
});

export default router;
