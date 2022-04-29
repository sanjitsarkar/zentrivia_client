const { Score, User } = require("../models");

const addScore = async (req, res) => {
  try {
    const { points, id: quizId, inCorrectQuestionsId } = req.body;
    const score = await Score.create({
      userId: req.user.id,
      points,
      quizId,
      inCorrectQuestionsId,
    });
    res.json({ score });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const updateScore = async (req, res) => {
  const { points, inCorrectQuestionsId } = req.body;
  try {
    const { id: quizId } = req.params;
    let score = await Score.findOne({ quizId, userId: req.user.id });
    if (score === null || score === undefined) {
      score = await Score.create({
        userId: req.user.id,
        points,
        quizId,
        inCorrectQuestionsId,
      });
    } else {
      score = await Score.updateOne(
        { quizId, userId: req.user.id },
        {
          userId: req.user.id,
          points,
          quizId,
          inCorrectQuestionsId,
        }
      );
    }
    await User.findByIdAndUpdate(req.user.id, {
      $inc: {
        totalScore: points,
      },
    });
    res.json({ score });
  } catch (err) {
    if (err) {
      await User.findByIdAndUpdate(req.user.id, {
        $inc: {
          totalScore: -points,
        },
      });
    }
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const deleteScore = async (req, res) => {
  try {
    const { id: quizId } = req.params;
    const isScoreExists = await Score.findOne({
      quizId,
      creatorId: req.user.id,
    });
    if (isScoreExists) {
      const score = await Score.deleteOne({ quizId });
      res.json({ score });
    } else
      res
        .status(404)
        .json({ errors: ["You are not authorized to perform this action"] });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchScore = async (req, res) => {
  try {
    const { id: quizId } = req.params;
    const score = await Score.findOne({ quizId });
    res.json({ score });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchAllScore = async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user.id });
    res.json({ scores });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const getRank = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    rank = await User.count({
      totalScore: { $gt: user.totalScore },
    });
    rank += 1;
    res.json({ rank });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
module.exports = {
  addScore,
  updateScore,
  deleteScore,
  fetchScore,
  fetchAllScore,
  getRank,
};
