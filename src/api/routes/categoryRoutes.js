const express = require("express");
const { auth } = require("../middlewares");

const {
  fetchAllCategory,
  fetchCategory,
  addCategory,
  deleteCategory,
  updateCategory,
  fetchAllCategoryByCreatorId,
  searchCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.get("/search", searchCategory);
router.get("/", fetchAllCategory);
router.get("/user/:id", fetchAllCategoryByCreatorId);
router.post("/", auth, addCategory);
router.delete("/:id", auth, deleteCategory);
router.get("/:id", fetchCategory);
router.put("/:id", auth, updateCategory);

module.exports = router;
