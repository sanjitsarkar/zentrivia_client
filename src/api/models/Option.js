const { Schema, model } = require("mongoose");
const optionSchema = new Schema({
  value: {
    type: String,
    required: [true, "Option value can't be empty."],
  },
  isCorrect: {
    type: Boolean,
    required: [true, "isCorrect Id can't be empty."],
    default: false,
  },
});

module.exports = option = model("option", optionSchema);
