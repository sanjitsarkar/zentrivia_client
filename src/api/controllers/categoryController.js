const { Category } = require("../models");

const addCategory = async (req, res) => {
  try {
    const { name, img, description } = req.body;
    const category = await Category.create({
      name,
      img,
      description,
      creatorId: req.user.id,
    });
    res.json({ category });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, img, description } = req.body;
    const isCategoryExists = await Category.findOne({
      _id: id,
      creatorId: req.user.id,
    });
    if (isCategoryExists) {
      const category = await Category.updateOne(
        { _id: id },
        { name, img, description }
      );
      res.json({ category });
    } else
      res
        .status(404)
        .json({ errors: ["You are not authorized to perform this action"] });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const isCategoryExists = await Category.findOne({
      _id: id,
      creatorId: req.user.id,
    });
    if (isCategoryExists) {
      const category = await Category.deleteOne({ _id: id });
      res.json({ category });
    } else
      res
        .status(404)
        .json({ errors: ["You are not authorized to perform this action"] });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.json({ category });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchAllCategory = async (req, res) => {
  try {
    let categories;
    const { search } = req.query;
    if (search)
      categories = await Category.find(
        { $text: { $search: search } },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });
    else categories = await Category.find();
    res.json({ categories });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchAllCategoryByCreatorId = async (req, res) => {
  try {
    const { search } = req.query;
    let categories;
    if (search)
      categories = await Category.find(
        {
          creatorId: req.user.id,
          $text: { $search: search },
        },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });
    else categories = await Category.find({ creatorId: req.user.id });
    res.json({ categories });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};

module.exports = {
  addCategory,
  updateCategory,
  deleteCategory,
  fetchCategory,
  fetchAllCategory,
  fetchAllCategoryByCreatorId,
};
