const { User } = require("../models");
const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    if (user) {
      res.json(user);
    }
  } catch (err) {
    console.log(err);
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
      updatedAt: user.updatedAt,
      updatedAt: user.updatedAt,
      token: user.token,
    });
  } catch (err) {
    res.status(401).json({ errors: [err.message.split(",")] });
  }
};

module.exports = { loginController, signupController };
