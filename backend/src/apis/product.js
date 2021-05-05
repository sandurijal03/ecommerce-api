import { Router } from 'express';
import Category from '../models/category';
import Product from '../models/product';
import { isValidObjectId } from 'mongoose';

const router = Router();

router.get('/', async (req, res) => {
  const products = await Product.find()
    .select('name image')
    .populate('category');
  if (!products) {
    res.status(500).json({ success: false, message: 'Product List is empty' });
  }
  res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate('category');
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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).send('Invalid Product Id');
  }

  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send('Invalid category');

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

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        richDescription,
        image,
        brand,
        countInStock,
        rating,
        numReviews,
        isFeatured,
      },
      { new: true },
    );

    if (!product) {
      res.status(400).json({
        success: false,
        msg: 'product with that id could not be found.',
      });
    }

    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndRemove(id);
    if (deletedProduct) {
      return res
        .status(200)
        .json({ success: true, message: 'product is deleted' });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Product with that id couldnot be found.',
      });
    }
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

router.get('/get/count', async (req, res) => {
  try {
    const productCount = await Product.countDocuments((count) => count);

    if (!productCount) {
      res.status(500).json({ success: false });
    }

    res.status(200).json({ productCount });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

router.get('/get/featured/:count', async (req, res) => {
  const { count } = req.params ? req.params : 0;
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).limit(
      +count,
    );

    if (!featuredProducts) {
      res.status(500).json({ success: false });
    }

    res.status(200).json({ success: true, featuredProducts });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

export default router;
