const authenticateToken = require("./authenticateToken");
const isPermissible = require("./isPermissible");
module.exports = { auth: authenticateToken, isPermissible };
