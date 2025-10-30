import { Router } from 'express';
import { createOrder, listOrders } from '../controllers/orderController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', requireAuth, createOrder);
router.get('/', requireAuth, listOrders);

export default router;


