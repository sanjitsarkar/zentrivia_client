const { Schema, model } = require("mongoose");
const { default: isURL } = require("validator/lib/isURL");
const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz title can't be empty."],
      unique: [true, "Quiz title is already taken."],
      index: true,
    },
    quizCoverImage: {
      type: String,
      validate: (val) => isURL(val),
    },

    creatorId: {
      type: Schema.Types.ObjectId,
      required: [true, "Creator Id can't be empty."],
    },
    quizDifficulty: {
      type: String,
      required: [true, "Quiz Difficulty can't be empty."],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: [true, "Category can't be empty."],
    },
    quizDesc: { type: String, default: "" },
    totalQuestion: { type: Number, default: 0 },
    totalPlayedUser: { type: Number, default: 0 },
  },
  { timestamps: true }
);
quizSchema.index({ title: "text" });

module.exports = quiz = model("quiz", quizSchema);
