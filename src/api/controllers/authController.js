const req = require("express/lib/request");
const { User } = require("../models");
const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    if (user) {
      res.json({
        _id: user._id,

        profilePictureURL: user.profilePictureURL,
        email: user.email,
        name: user.name,
        totalScore: user.totalScore,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
        token: user.token,
      });
    }
  } catch (err) {
    res.status(401).json({ errors: [err.message.split(",")] });
  }
};
const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.signup(name, email, password);
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      profilePictureURL: user.profilePictureURL,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
      totalScore: user.totalScore,
      token: user.token,
    });
  } catch (err) {
    res.status(401).json({ errors: [err.message.split(",")] });
  }
};
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      profilePictureURL: user.profilePictureURL,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
      totalScore: user.totalScore,
    });
  } catch (err) {
    res.status(401).json({ errors: [err.message.split(",")] });
  }
};

module.exports = { loginController, signupController, getUserInfo };
