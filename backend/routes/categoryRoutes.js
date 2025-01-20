import express from "express";

const router = express.Router();

import { createCategory, 
        updateCategory, 
        removeCategory, 
        listCategory,
        readCategory
    } from '../controllers/categoryController.js'
import { authenticate, authorized } from "../middlewares/authMiddleware.js"

router.route('/').post(authenticate, authorized, createCategory);
router.route('/:categoryId').put(authenticate, authorized, updateCategory);
router.route('/:categoryId').delete(authenticate, authorized, removeCategory);

router.route('/categories').get(listCategory);
router.route('/:id').get(readCategory);

export default router;