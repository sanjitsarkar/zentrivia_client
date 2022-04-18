const { Question, Quiz } = require("../models");

const addQuestion = async (req, res) => {
  try {
    if (req.admin.includes("write")) {
      const { title, quizId, options } = req.body;
      const isQuizExists = await Quiz.findById(quizId);
      if (!isQuizExists) throw Error("Quiz does not exist");
      const question = await Question.create({
        title,
        quizId,
        options,
      });

      res.json({ question });
    } else throw Error("You are not authorized to perform this action");
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const updateQuestion = async (req, res) => {
  try {
    if (req.admin.includes("update")) {
      const { id } = req.params;
      const { title, quizId, options } = req.body;
      const isQuizExists = await Quiz.findById(quizId);
      if (!isQuizExists) throw Error("Quiz does not exist");

      const question = await Question.updateOne(
        { _id: id },
        {
          title,
          quizId,
          options,
        }
      );
      res.json({ question });
    } else throw Error("You are not authorized to perform this action");
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const deleteQuestion = async (req, res) => {
  try {
    if (req.admin.includes("delete")) {
      const { id } = req.params;
      const Question = await Question.deleteOne({ _id: id });
      res.json({ Question });
    } else throw Error("You are not authorized to perform this action");
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    res.json({ question });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchAllQuestion = async (req, res) => {
  try {
    const question = await Question.find();
    res.json({ question });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};

module.exports = {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  fetchQuestion,
  fetchAllQuestion,
};
