const { User } = require("../models");
const loginController = async (req, res) => {
  console.log("loginController");
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    if (user) {
      res.json({
        _id: user._id,
        email: user.email,
        name: user.name,
        phoneNo: user.phoneNo,
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
    const { name, email, password, phoneNo } = req.body;
    const user = await User.signup(name, email, password);
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      phoneNo,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
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
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(401).json({ errors: [err.message.split(",")] });
  }
};
const updateUserInfo = async (req, res) => {
  try {
    const { name, phoneNo } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        profilePictureURL,
      },
      { new: true }
    );
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      phoneNo: user.phoneNo,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
      token: user.token,
    });
  } catch (err) {
    res.status(401).json({ errors: [err.message.split(",")] });
  }
};

module.exports = {
  loginController,
  signupController,
  getUserInfo,
  updateUserInfo,
};
