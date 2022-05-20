const express = require("express");
const { auth } = require("../middlewares");

const {
  fetchAllQuestion,
  fetchQuestion,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/questionController");
const router = express.Router();

router.get("/", fetchAllQuestion);
router.post("/", auth, addQuestion);
router.delete("/:id/:quizId", auth, deleteQuestion);
router.get("/:id", fetchQuestion);
router.put("/:id", auth, updateQuestion);

module.exports = router;
