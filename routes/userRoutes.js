const express = require("express");
const userRoutes = express.Router();

const {
  userRegisterCtrl,
  userLoginCtrl,
  getAllUserCtrl,
  getUserByIdCtrl,
  updateUserCtrl,
  deleteUserCtrl,
  getUserProfileCtrl,
  uploadPhotoProfileCtrl,
  updatePasswordUserCtrl,
  blockUserCtrl,
  unblockUserCtrl,
  adminDashboardCtrl,

  userLogoutCtrl,
} = require("../controllers/userControllers");
const isLogin = require("../middlewares/isLogin");
const isSuperAdmin = require("../middlewares/isSuperAdmin");
const isAdmin = require("../middlewares/isAdmin");

const storage = require("../configs/upload-profile-images");
const multer = require("multer");
const upload = multer({ storage });

//POST/users/register
userRoutes.post("/register", isSuperAdmin, isLogin, userRegisterCtrl);

//POST/users/login
userRoutes.post("/login", userLoginCtrl);

//GET/users/logout
userRoutes.get("/logout", isLogin, userLogoutCtrl);

//GET/users/ get all user
userRoutes.get("/", isLogin, isSuperAdmin, getAllUserCtrl);

//GET/users/:id
userRoutes.get("/:id", isLogin, isSuperAdmin, getUserByIdCtrl);

//DELETE/users/ Xóa tài khoản
userRoutes.delete("/", isLogin, isSuperAdmin, deleteUserCtrl);

//UPDATE/users/
userRoutes.put("/:id", isLogin, isSuperAdmin, updateUserCtrl);

//GET/users/profile
userRoutes.get("/profile/get-profile", isLogin, getUserProfileCtrl);

//UPDATE Photo
userRoutes.post(
  "/update/profile-photo-upload",
  isLogin,
  upload.single("profile"),
  uploadPhotoProfileCtrl
);

//PUT /User change password
userRoutes.put("/update/password", isLogin, updatePasswordUserCtrl);

//PUT /Admin block user
userRoutes.put("/block-user/:id", isLogin, isSuperAdmin, blockUserCtrl);

//PUT /Admin unblock user
userRoutes.put("/unblock-user/:id", isLogin, isSuperAdmin, unblockUserCtrl);

//GET /Admin unblock user
userRoutes.get("/admins/dashboard", isLogin, isAdmin, adminDashboardCtrl);

module.exports = userRoutes;
