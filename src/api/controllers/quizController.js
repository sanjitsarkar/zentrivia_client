const { Quiz, Category, Question } = require("../models");

const addQuiz = async (req, res) => {
  try {
    const { title, quizCoverImage, quizDifficulty, categoryId, quizDesc } =
      req.body;
    const creatorId = req.user.id;
    const isCategoryExists = await Category.findById(categoryId);
    if (!isCategoryExists) throw Error("Category does not exist");
    const quiz = await Quiz.create({
      title,
      quizCoverImage,
      quizDifficulty,
      categoryId,
      quizDesc,
      creatorId,
    });
    await Category.findByIdAndUpdate(categoryId, {
      $inc: { quizCount: 1 },
    });
    res.json({ quiz });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      quizCoverImage,
      quizDifficulty,
      categoryId,
      quizDesc,
      totalQuestion,
      totalPlayedUser,
    } = req.body;
    const creatorId = req.user.id;
    const isQuizExists = await Quiz.findOne({ _id: id, creatorId });
    if (isQuizExists) {
      const isCategoryExists = await Category.findById(categoryId);
      if (!isCategoryExists) throw Error("Category does not exist");

      const quiz = await Quiz.findByIdAndUpdate(
        id,
        {
          title,
          quizCoverImage,
          quizDifficulty,
          categoryId,
          quizDesc,
          creatorId,
          totalQuestion,
          totalPlayedUser,
        },
        { new: true }
      );
      res.json({ quiz });
    } else
      res
        .status(404)
        .json({ errors: ["You are not authorized to perform this action"] });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const creatorId = req.user.id;
    const isQuizExists = await Quiz.findOne({ _id: id, creatorId });
    if (isQuizExists) {
      const quiz = await Quiz.deleteOne({ _id: id });
      await Category.findByIdAndUpdate(isQuizExists.categoryId, {
        $inc: { quizCount: -1 },
      });
      res.json({ quiz });
    } else
      res
        .status(404)
        .json({ errors: ["You are not authorized to perform this action"] });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    res.json({ quiz });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchAllQuiz = async (req, res) => {
  try {
    const { search, skip } = req.query;
    let quizzes;
    if (search)
      quizzes = await Quiz.find(
        { $text: { $search: search, $caseSensitive: false } },
        { score: { $meta: "textScore" } }
      )
        .sort({
          score: { $meta: "textScore" },
          updatedAt: -1,
          totalQuestion: -1,
        })
        .skip(skip)
        .limit(5);
    else
      quizzes = await Quiz.find()
        .sort({ updatedAt: -1, totalQuestion: -1 })
        .skip(skip)
        .limit(5);
    res.json({ quizzes });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchAllQuizByCreatorId = async (req, res) => {
  try {
    const { search, skip } = req.query;
    let quizzes;
    if (search)
      quizzes = await Quiz.find(
        {
          creatorId: req.user.id,
          $text: { $search: search, $caseSensitive: false },
        },
        { score: { $meta: "textScore" } }
      )
        .sort({
          score: { $meta: "textScore" },
          updatedAt: -1,
          totalQuestion: -1,
        })
        .skip(skip)
        .limit(5);
    else
      quizzes = await Quiz.find({ creatorId: req.user.id })
        .sort({
          updatedAt: -1,
          totalQuestion: -1,
        })
        .skip(skip)
        .limit(5);
    res.json({ quizzes });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchAllQuestionByQuizId = async (req, res) => {
  try {
    const { id: quizId } = req.params;
    const { search, skip } = req.query;
    let questions;
    if (search)
      questions = await Question.find(
        { quizId, $text: { $search: search, $caseSensitive: false } },
        { score: { $meta: "textScore" } }
      )
        .sort({
          score: { $meta: "textScore" },
          updatedAt: -1,
          totalQuestion: -1,
        })
        .skip(skip)
        .limit(5);
    else questions = await Question.find({ quizId }).skip(skip).limit(5);
    res.json({ questions });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchAllQuizByCategoryId = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const { difficulty, skip } = req.query;
    let quizzes;
    if (difficulty !== "undefined")
      quizzes = await Quiz.find({
        categoryId,
        quizDifficulty: difficulty,
      })
        .skip(skip)
        .limit(5)
        .sort({
          updatedAt: -1,
          totalQuestion: -1,
        });
    else
      quizzes = await Quiz.find({
        categoryId,
      })
        .skip(skip)
        .limit(5)
        .sort({
          updatedAt: -1,
          totalQuestion: -1,
        });

    res.json({ quizzes });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};

module.exports = {
  addQuiz,
  updateQuiz,
  deleteQuiz,
  fetchQuiz,
  fetchAllQuiz,
  fetchAllQuestionByQuizId,
  fetchAllQuizByCreatorId,
  fetchAllQuizByCategoryId,
};
