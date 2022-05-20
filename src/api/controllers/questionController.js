const { Question, Quiz } = require("../models");

const addQuestion = async (req, res) => {
  try {
    const { title, quizId, options } = req.body;
    const isQuizExists = await Quiz.findOne({ quizId, creatorId: req.user.id });
    if (!isQuizExists)
      res
        .status(404)
        .json({ errors: ["You are not authorized to perform this action"] });
    const question = await Question.create({
      title,
      quizId,
      options,
    });
    await Quiz.findByIdAndUpdate(quizId, {
      $inc: { totalQuestion: 1 },
    });

    res.json({ question });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, quizId, options } = req.body;
    const isQuizExists = await Quiz.findOne({ quizId, creatorId: req.user.id });
    if (!isQuizExists)
      res
        .status(404)
        .json({ errors: ["You are not authorized to perform this action"] });

    const question = await Question.updateOne(
      { _id: id },
      {
        title,
        quizId,
        options,
      }
    );
    res.json({ question });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const deleteQuestion = async (req, res) => {
  try {
    const { id, quizId } = req.params;
    const question = await Question.deleteOne({ _id: id });
    await Quiz.findByIdAndUpdate(quizId, {
      $inc: { totalQuestion: -1 },
    });
    res.json({ question });
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
    const questions = await Question.find();
    res.json({ questions });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const searchQuestion = async (req, res) => {
  try {
    const { search } = req.query;
    const { id: quizId } = req.params;
    if (!search) throw Error("Please add query search value");
    const questions = await Question.find(
      { quizId, $text: { $search: search } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });
    res.json({ questions });
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
  searchQuestion,
};
