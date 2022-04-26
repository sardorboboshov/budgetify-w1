const Category = require('../models/categories');

exports.createCategory = async (req, res) => {
  try {
    const { title, type } = req.body;
    if (!title || !type) {
      return res.json({ message: 'Title and type are required' });
    }
    const categories = await Category.find({});
    const categoryExists = await Category.find({
      title: title.toLowerCase(),
      type,
    });
    if (categoryExists.length > 0) {
      return res
        .status(400)
        .json({ message: 'Category with this title already exists' });
    }
    const category_id =
      categories && categories.length === 0
        ? 0
        : categories[categories.length - 1].category_id + 1;
    const category = await Category.create({
      title: title.toLowerCase(),
      type,
      category_id,
    });
    res.json({ data: category });
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
    const { category_id } = req.params;
    const category_ = await Category.findOne({ category_id });
    const elements = Object.keys(req.body);
    elements.forEach((element) => {
      if (element !== 'title') {
        return res.json({
          message: `${element} is not a valid element for category`,
        });
      }
    });
    const categoryExists = await Category.find({
      title: req.body.title.toLowerCase(),
      type: category_.type,
    });
    if (categoryExists.length > 0) {
      return res
        .status(400)
        .json({ message: 'Category with this title already exists' });
    }
    const category = await Category.findOneAndUpdate(
      {
        category_id,
      },
      req.body,
      { new: true }
    );
    if (!category) {
      return res.json({ message: 'Category not found' });
    }
    await category.save();
    res.json({ category });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      category_id: req.params.category_id,
    });
    if (!category) {
      return res.json({ message: 'Category not found' });
    }
    await category.remove();
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.json({ message: err.message });
  }
};
