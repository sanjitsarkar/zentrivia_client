const { Schema, model } = require("mongoose");
const Option = require("./Option");
const questionSchema = new Schema(
  {
    title: {
      type: String,
      index: true,
      required: [true, "Question title can't be empty."],
      unique: [true, "Question title is already taken."],
    },
    quizId: {
      type: Schema.Types.ObjectId,
      required: [true, "Quiz Id can't be empty."],
    },
    options: {
      type: [Option.schema],
      required: [true, "Options can't be empty."],
    },
  },
  { timestamps: true }
);

questionSchema.index({ title: "text" });

module.exports = question = model("question", questionSchema);
