const { Schema, model } = require("mongoose");
const adminSchema = new Schema(
  {
    userId: Schema.Types.ObjectId,
  },
  { timestamps: true }
);

module.exports = admin = model("admin", adminSchema);
