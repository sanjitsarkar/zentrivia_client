const jwt = require("jsonwebtoken");
const { Admin } = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;

const isPermissible = async (req, res, next) => {
  const admin = await Admin.findOne({ userId: ObjectId(req.user.id) });

  if (admin) {
    req.admin = admin.permissions;
    next();
  } else {
    res
      .status(401)
      .json({ errors: ["You are not authorized to perform this action"] });
  }
};
module.exports = isPermissible;
