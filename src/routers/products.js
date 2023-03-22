import express from 'express';

import { create, getAll, remove, get, update } from '../controllers/products';


const router = express.Router();
router.get("/products", getAll);
router.post("/products", create);
router.delete("/products/:id", remove);
router.get("/products/:id", get);
router.put("/products/:id", update);

export default router;