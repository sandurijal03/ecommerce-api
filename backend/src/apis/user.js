import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.find();
  if (!users) {
    res.status(500).json({ success: false });
  }
  res.status(200).json({ msg: 'User created', users });
});

export default router;
