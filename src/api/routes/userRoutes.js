const express = require("express");
const { auth } = require("../middlewares");

const {
  getUserInfo,
  updateUserInfo,
} = require("../controllers/authController");
const router = express.Router();

router.get("/", auth, getUserInfo);
router.put("/", auth, updateUserInfo);

module.exports = router;
