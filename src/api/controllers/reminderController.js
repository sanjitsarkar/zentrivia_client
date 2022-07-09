const { sendEmailandSMS } = require("../services/sendEmailandSMS");
const { Reminder } = require("../models");

const addReminder = async (req, res) => {
  try {
    const { title, message, status, sendTime } = req.body;
    const reminder = await Reminder.create({
      title,
      message,
      status,
      sendTime,
      creatorId: req.user.id,
    });
    res.json({ reminder });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, status, sendTime } = req.body;
    const isReminderExists = await Reminder.findOne({
      _id: id,
      creatorId: req.user.id,
    });
    if (isReminderExists) {
      const reminder = await Reminder.findByIdAndUpdate(
        id,
        { title, message, status, sendTime },
        {
          new: true,
        }
      );
      res.json({ reminder });
    } else
      res
        .status(404)
        .json({ errors: ["You are not authorized to perform this action"] });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const isReminderExists = await Reminder.findOne({
      _id: id,
      creatorId: req.user.id,
    });
    if (isReminderExists) {
      const reminder = await Reminder.findByIdAndDelete(id);
      res.json({ reminderId: reminder._id });
    } else
      res
        .status(404)
        .json({ errors: ["You are not authorized to perform this action"] });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await Reminder.findById(id);
    res.json({ reminder });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchAllReminder = async (req, res) => {
  try {
    let reminders;
    const { search, skip } = req.query;
    if (search)
      reminders = await Reminder.find(
        { $text: { $search: search, $caseSensitive: false } },
        { score: { $meta: "textScore" } }
      )
        .skip(skip)
        .limit(5)
        .sort({ score: { $meta: "textScore" }, updatedAt: -1, quizCount: -1 });
    else
      reminders = await Reminder.find()
        .skip(skip)
        .limit(5)
        .sort({ updatedAt: -1, quizCount: -1 });
    res.json({ reminders });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchAllReminderByCreatorId = async (req, res) => {
  try {
    const { search, skip } = req.query;
    let reminders;
    if (search)
      reminders = await Reminder.find(
        {
          creatorId: req.user.id,
          $text: { $search: search, $caseSensitive: false },
        },
        { score: { $meta: "textScore" } }
      )
        .skip(skip)
        .limit(5)
        .sort({ score: { $meta: "textScore" }, updatedAt: -1, quizCount: -1 });
    else
      reminders = await Reminder.find({ creatorId: req.user.id })
        .skip(skip)
        .limit(5)
        .sort({
          updatedAt: -1,
          quizCount: -1,
        });
    res.json({ reminders });
  } catch (err) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};

const sendReminder = async (req, res) => {
  const { id } = req.params;
  const { fromEmail, phoneNo } = req.body;
  const reminder = await Reminder.findById(id);
  if (reminder) {
    const { sendTime } = reminder;
    try {
      const response = await sendEmailandSMS(
        sendTime,
        fromEmail,
        fromEmail,
        reminder.title,
        reminder.message,
        phoneNo
      );
      res.json({ response });
    } catch (err) {
      res.status(404).json({ errors: [err.message.split(",")] });
    }
  }
};
module.exports = {
  addReminder,
  updateReminder,
  deleteReminder,
  fetchReminder,
  fetchAllReminder,
  fetchAllReminderByCreatorId,
  sendReminder,
};
