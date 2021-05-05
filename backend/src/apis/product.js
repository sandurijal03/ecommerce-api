import { Router } from 'express';
import Category from '../models/category';
import Product from '../models/product';

const router = Router();

router.get('/', async (req, res) => {
  const products = await Product.find().select('name image -_id');
  if (!products) {
    res.status(500).json({ success: false, message: 'Product List is empty' });
  }
  res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res
        .status(500)
        .json({ success: false, message: 'Product with that id is not found' });
    }
    res.status(200).json({ product })``;
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
});

router.post('/', async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send('Invalid category');

  try {
    const {
      name,
      description,
      richDescription,
      image,
      brand,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = req.body;

    const product = new Product({
      name,
      description,
      richDescription,
      image,
      brand,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    });

    product = await product.save();

    if (!product) {
      return res.status(500).send('the product cannot be created');
    }

    res.status(201).json({ msg: 'product created successfully', product });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

export default router;
