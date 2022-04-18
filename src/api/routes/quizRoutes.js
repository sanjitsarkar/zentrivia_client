const express = require("express");
const { auth, isPermissible } = require("../middlewares");

const {
  fetchAllQuiz,
  fetchQuiz,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  fetchAllQuestionByQuizId,
} = require("../controllers/quizController");
const router = express.Router();

router.get("/", fetchAllQuiz);
router.get("/:id/questions", fetchAllQuestionByQuizId);
router.post("/", auth, isPermissible, addQuiz);
router.delete("/:id", auth, isPermissible, deleteQuiz);
router.get("/:id", fetchQuiz);
router.put("/:id", auth, isPermissible, updateQuiz);

module.exports = router;
