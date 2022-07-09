const express = require("express");
const { auth } = require("../middlewares");

const {
  fetchReminder,
  addReminder,
  deleteReminder,
  updateReminder,
  fetchAllReminderByCreatorId,
  sendReminder,
} = require("../controllers/reminderController");
const router = express.Router();
router.get("/", auth, fetchAllReminderByCreatorId);
router.post("/", auth, addReminder);
router.delete("/:id", auth, deleteReminder);
router.get("/:id", auth, fetchReminder);
router.put("/:id", auth, updateReminder);
router.post("/:id/send", auth, sendReminder);

module.exports = router;
