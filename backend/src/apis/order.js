import { Router } from 'express';
import Order from '../models/order';

const router = Router();

router.get('/', async (req, res) => {
  const orders = await Order.find();
  if (!orders) {
    res.status(500).json({ success: false });
  }
  res.send(orders);
});

export default router;
