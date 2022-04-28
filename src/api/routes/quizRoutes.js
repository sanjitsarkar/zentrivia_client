const express = require("express");
const { auth } = require("../middlewares");

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
router.post("/", auth, addQuiz);
router.delete("/:id", auth, deleteQuiz);
router.get("/:id", fetchQuiz);
router.put("/:id", auth, updateQuiz);

module.exports = router;
