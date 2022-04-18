const express = require("express");
const { auth, isPermissible } = require("../middlewares");

const {
  fetchAllCategory,
  fetchCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.get("/", fetchAllCategory);
router.post("/", auth, isPermissible, addCategory);
router.delete("/:id", auth, isPermissible, deleteCategory);
router.get("/:id", fetchCategory);
router.put("/:id", auth, isPermissible, updateCategory);

module.exports = router;
