const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");
const { appError } = require("./appError");
const isLogin = (req, res, next) => {
  // get token from header

  const token = getTokenFromHeader(req);
  // verify token
  if (token) {
    const decodedUser = verifyToken(token);
    //save the user in to req obj
    req.userAuth = decodedUser.id;
    if (!decodedUser) {
      return next(
        appError("Token không đúng hoặc đã hết hạn, vui lòng đăng nhập lại !")
      );
    } else {
      next();
    }
  } else {
    return next(
      appError("Token không đúng hoặc đã hết hạn, vui lòng đăng nhập lại !")
    );
  }
};

module.exports = isLogin;
