import { Router } from 'express';
import { hash } from 'bcryptjs';

import User from '../models/user';

const router = Router();

router.get('/', async (req, res) => {
  const userList = await User.find().select('-passwordHash');
  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.status(200).json({ msg: 'User created', userList });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select('-passwordHash');
  if (!user) {
    res.status(500).json({ success: false });
  }
  res.status(200).json({ success: true, user });
});

router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      street,
      passwordHash,
      phone,
      isAdmin,
      apartment,
      zip,
      city,
      country,
    } = req.body;

    let hashedPassword = await hash(passwordHash, 12);

    let user = new User({
      name,
      email,
      street,
      passwordHash: hashedPassword,
      phone,
      isAdmin,
      apartment,
      zip,
      city,
      country,
    });

    user = await user.save();

    if (!user) {
      return res.status(400).send('the user cannot be created');
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

export default router;
