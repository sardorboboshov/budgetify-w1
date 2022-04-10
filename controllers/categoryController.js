const Category = require('../models/categories');

exports.createCategory = async (req, res) => {
  try {
    const { title, type } = req.body;
    if (!title || !type) {
      return res.json({ message: 'Title and type are required' });
    }
    const categories = await Category.find({});
    categories.forEach((category_) => {
      if (category_.title.toLowerCase() === title) {
        return res.status(400).json({ message: 'Category already exists' });
      }
    });
    const category = await Category.create({
      title: title.toLowerCase(),
      type,
    });
    res.json({ category });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.json({ categories });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { category_title } = req.params;
    const elements = Object.keys(req.body);
    elements.forEach((element) => {
      if (element !== 'type' && element !== 'title') {
        return res.json({
          message: `${element} is not a valid element for category`,
        });
      }
    });
    const category = await Category.findOneAndUpdate(
      {
        title: category_title,
      },
      req.body
    );
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.save();
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      title: req.params.category_title,
    });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.remove();
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.json({ message: err.message });
  }
};
