const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");
const globalErrHandler = require("../middlewares/globalErrHandler");
const User = require("../model/user");
const { appError } = require("../middlewares/appError");

const isSuperAdmin = async (req, res, next) => {
  // get token from header
  const token = getTokenFromHeader(req);
  // verify token
  const decodedUser = verifyToken(token);
  //save the user in to req obj
  req.userAuth = decodedUser.id;
  // find User in DB
  const user = await User.findById(decodedUser.id);
  // check user is Admin
  if (user.isSuperAdmin) {
    return next();
  } else {
    return next(
      appError(
        "Bạn không có quyền thao tác. Chỉ có Admin mới có quyền thực hiện điều này",
        403
      )
    );
  }
};

module.exports = isSuperAdmin;
