const { Schema, model } = require("mongoose");
const adminSchema = new Schema(
  {
    userId: Schema.Types.ObjectId,
    permissions: {
      type: [String],
      default: ["read", "write"],
    },
  },
  { timestamps: true }
);

module.exports = admin = model("admin", adminSchema);
