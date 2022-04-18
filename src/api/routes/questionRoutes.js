const express = require("express");
const { auth, isPermissible } = require("../middlewares");

const {
  fetchAllQuestion,
  fetchQuestion,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/questionController");
const router = express.Router();

router.get("/", fetchAllQuestion);
router.post("/", auth, isPermissible, addQuestion);
router.delete("/:id", auth, isPermissible, deleteQuestion);
router.get("/:id", fetchQuestion);
router.put("/:id", auth, isPermissible, updateQuestion);

module.exports = router;
