const { Schema, model } = require("mongoose");
const scoreSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "Quiz Id can't be empty."],
    },
    points: {
      type: Number,
      required: [true, "Points can't be empty."],
      unique: false,
    },
    quizId: {
      type: Schema.Types.ObjectId,
      required: [true, "quizId can't be empty."],
    },
    inCorrectQuestionsId: {
      type: [Schema.Types.ObjectId],
      required: [true, "inCorrectQuestionsId can't be empty."],
    },
  },
  { timestamps: true }
);

module.exports = score = model("score", scoreSchema);
