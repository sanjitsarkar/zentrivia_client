const { Quiz, Category, Question } = require("../models");

const addQuiz = async (req, res) => {
  try {
    if (req.admin.includes("write")) {
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

      res.json({ quiz });
    } else throw Error("You are not authorized to perform this action");
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const updateQuiz = async (req, res) => {
  try {
    if (req.admin.includes("update")) {
      const { id } = req.params;
      const { title, quizCoverImage, quizDifficulty, categoryId, quizDesc } =
        req.body;
      const creatorId = req.user.id;
      const isCategoryExists = await Category.findById(categoryId);
      if (!isCategoryExists) throw Error("Category does not exist");

      const quiz = await Quiz.updateOne(
        { _id: id },
        {
          title,
          quizCoverImage,
          quizDifficulty,
          categoryId,
          quizDesc,
          creatorId,
        }
      );
      res.json({ quiz });
    } else throw Error("You are not authorized to perform this action");
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const deleteQuiz = async (req, res) => {
  try {
    if (req.admin.includes("delete")) {
      const { id } = req.params;
      const quiz = await Quiz.deleteOne({ _id: id });
      res.json({ quiz });
    } else throw Error("You are not authorized to perform this action");
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
    const quiz = await Quiz.find();
    res.json({ quiz });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchAllQuestionByQuizId = async (req, res) => {
  try {
    const { id: quizId } = req.params;
    const question = await Question.find({ quizId });
    res.json({ question });
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
};
