const express = require("express");
const { auth } = require("../middlewares");

const { fetchAllQuizByCreatorId } = require("../controllers/quizController");
const {
  fetchAllCategoryByCreatorId,
} = require("../controllers/categoryController");
const { searchQuestion } = require("../controllers/questionController");
const {
  addScore,
  updateScore,
  deleteScore,
  fetchAllScore,
  fetchScore,
} = require("../controllers/scoreController");
const router = express.Router();

router.get("/quizzes", auth, fetchAllQuizByCreatorId);
router.get("/quizzes/search", auth, fetchAllQuizByCreatorId);
router.get("/quizzes/:id/search", auth, searchQuestion);
router.get("/categories", auth, fetchAllCategoryByCreatorId);
router.get("/categories/search", auth, fetchAllCategoryByCreatorId);
router.get("/scores", auth, fetchAllScore);
router.get("/scores/:id", auth, fetchScore);
router.post("/scores/", auth, addScore);
router.put("/scores/:id", auth, updateScore);
router.delete("/scores/:id", auth, deleteScore);

module.exports = router;
