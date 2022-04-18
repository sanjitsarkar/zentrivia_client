const { Schema, model } = require("mongoose");
const { default: isURL } = require("validator/lib/isURL");
const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "Category name should be unique."],
      required: [true, "Category name can't be empty."],
    },
    img: {
      type: String,
      validate: (val) => isURL(val),
      required: [true, "Category image can't be empty."],
    },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = Category = model("category", categorySchema);
