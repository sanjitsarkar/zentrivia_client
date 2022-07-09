const { Schema, model } = require("mongoose");
const { default: isURL } = require("validator/lib/isURL");
const reminderSchema = new Schema(
  {
    name: {
      type: String,
      index: true,
      unique: [true, "Reminder name should be unique."],
      required: [true, "Reminder name can't be empty."],
    },
    img: {
      type: String,
      validate: (val) => isURL(val),
    },
    description: { type: String, default: "" },
    creatorId: {
      type: Schema.Types.ObjectId,
      required: [true, "Creator Id can't be empty."],
    },
    quizCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
ReminderSchema.index({ name: "text" });
module.exports = Reminder = model("Reminder", ReminderSchema);
