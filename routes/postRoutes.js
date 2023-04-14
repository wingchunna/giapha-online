const express = require("express");
const {
  addPostCtrl,
  getAllPostCtrl,
  getPostByIdCtrl,
  updatePostCtrl,
  deletePostCtrl,
} = require("../../controller/postController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const storage = require("../../config/upload-post-images");
const multer = require("multer");
const upload = multer({ storage });
const postRoutes = express.Router();

//post/add
postRoutes.post("/", isLogin, isAdmin, upload.single("image"), addPostCtrl);

//GET/post/
postRoutes.get("/", getAllPostCtrl);

//GET/post/:id
postRoutes.get("/:id", getPostByIdCtrl);

//DELETE/post/
postRoutes.delete("/:id", isLogin, isAdmin, deletePostCtrl);

//UPDATE/post/
postRoutes.put(
  "/:id",
  isLogin,
  isAdmin,
  upload.single("image"),
  updatepostCtrl
);

module.exports = postRoutes;
