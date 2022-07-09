const { Schema, model } = require("mongoose");
const reminderSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Reminder title can't be empty."],
    },
    message: {
      type: String,
      required: [true, "Reminder message can't be empty."],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed"],
      required: [true, "Reminder status can't be empty."],
    },
    sendTime: {
      type: Number,
      required: [true, "Reminder sendTime can't be empty."],
    },
    description: { type: String, default: "" },
    creatorId: {
      type: Schema.Types.ObjectId,
      required: [true, "Creator Id can't be empty."],
    },
  },
  { timestamps: true }
);
reminderSchema.index({ name: "text" });
module.exports = Reminder = model("Reminder", reminderSchema);
