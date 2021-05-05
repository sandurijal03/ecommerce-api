import { Router } from 'express';
import Category from '../models/category';

const router = Router();

router.get('/', async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      res
        .status(500)
        .json({ message: 'category with that id couldnot be located' });
    }
    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  const { name, icon, color } = req.body;
  try {
    let category = new Category({
      name,
      icon,
      color,
    });

    category = await category.save();

    if (!category) {
      return res.status(404).send('Category couldnot be created');
    }
    res.send(category);
  } catch (err) {
    res.status(500).send('Product couldnot be added');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndRemove(id);
    if (deletedCategory) {
      return res
        .status(200)
        .json({ success: true, message: 'category is deleted' });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Category with that id couldnot be found.',
      });
    }
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, icon, color } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        icon,
        color,
      },
      { new: true },
    );

    if (!category) {
      res.status(400).json({
        success: false,
        msg: 'category with that id could not be found.',
      });
    }

    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

export default router;
