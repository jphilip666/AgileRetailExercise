import express, { type Request, type Response, type NextFunction } from 'express';

const router = express.Router();

// get all items
router.get('/items', (req: Request, res: Response) => {
  res.status(200).send({
    status: "success",
    message: "get all items"
  });
});

// get item
router.get('/items/:id', (req: Request, res: Response) => {
  res.status(200).send({
    status: "success",
    message: "get item"
  });
});

// post
router.post('/items', (req: Request, res: Response) => {
  res.status(201).send({
    status: "success"
  });
});

// update
router.put('/items/:id', (req: Request, res: Response) => {
  res.status(200).send({
    status: "success"
  });
});

// delete
router.delete('/items/:id', (req: Request, res: Response) => {
  res.status(200).send({
    status: "success"
  });
});

export default router;