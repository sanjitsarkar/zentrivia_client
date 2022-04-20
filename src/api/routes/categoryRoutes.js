const express = require("express");
const { auth } = require("../middlewares");

const {
  fetchAllCategory,
  fetchCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const { fetchAllQuizByCategoryId } = require("../controllers/quizController");
const router = express.Router();

router.get("/", fetchAllCategory);
router.get("/:id/quizzes", fetchAllQuizByCategoryId);
router.post("/", auth, addCategory);
router.delete("/:id", auth, deleteCategory);
router.get("/:id", fetchCategory);
router.put("/:id", auth, updateCategory);

module.exports = router;
