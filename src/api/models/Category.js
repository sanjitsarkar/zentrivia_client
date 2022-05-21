const { Schema, model } = require("mongoose");
const { default: isURL } = require("validator/lib/isURL");
const categorySchema = new Schema(
  {
    name: {
      type: String,
      index: true,
      unique: [true, "Category name should be unique."],
      required: [true, "Category name can't be empty."],
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
  },
  { timestamps: true }
);
categorySchema.index({ name: "text" });
module.exports = Category = model("category", categorySchema);
