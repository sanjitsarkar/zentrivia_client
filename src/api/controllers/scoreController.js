const { Score, User } = require("../models");

const addScore = async (req, res) => {
  try {
    const { points, id: quizId, inCorrectQuestionsId } = req.body;
    const score = await Score.create(
      {
        userId: req.user.id,
        points,
        quizId,
        inCorrectQuestionsId,
      },
      { new: true }
    );
    let user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      {
        $inc: {
          totalScore: points,
        },
      },
      {
        new: true,
      }
    );
    user = {
      _id: user._id,
      email: user.email,
      name: user.name,
      profilePictureURL: user.profilePictureURL,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
      totalScore: user.totalScore,
      token: user.token,
    };
    res.json({ score, user });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const updateScore = async (req, res) => {
  const { points, inCorrectQuestionsId } = req.body;
  const { id: quizId } = req.params;
  let user;
  let score = await Score.findOne({ quizId, userId: req.user.id });
  try {
    if (!score) {
      score = await Score.create({
        userId: req.user.id,
        points,
        quizId,
        inCorrectQuestionsId,
      });
      (user = await User.findByIdAndUpdate(req.user.id, {
        $inc: {
          totalScore: points,
        },
      })),
        { new: true };
    } else {
      user = await User.findByIdAndUpdate(
        req.user.id,
        {
          $inc: {
            totalScore: points - score.points,
          },
        },
        { new: true }
      );
      score = await Score.findOneAndUpdate(
        { quizId, userId: req.user.id },
        {
          userId: req.user.id,
          points,
          quizId,
          inCorrectQuestionsId,
        },
        { new: true }
      );
    }
    res.json({ score, user });
  } catch (err) {
    console.log(err);
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
