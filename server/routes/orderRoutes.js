import { Router } from 'express';
import { createOrder, getUserOrders} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);

export default router;
