const express = require("express");
const {
  addPostCtrl,
  getAllPostCtrl,
  getPostByIdCtrl,
  updatePostCtrl,
  deletePostCtrl,
  getPostsByCategoryCtrl,
} = require("../controllers/postControllers");
const isLogin = require("../middlewares/isLogin");
const isAdmin = require("../middlewares/isAdmin");
const storage = require("../configs/upload-post-images");
const multer = require("multer");
const upload = multer({ storage });
const postRoutes = express.Router();

//post/add
postRoutes.post("/", isLogin, isAdmin, upload.single("image"), addPostCtrl);

//GET/post/
postRoutes.get("/", isLogin, isAdmin, getAllPostCtrl);

//GET/post/:id
postRoutes.get("/:id", getPostByIdCtrl);

//GET/post/:category_id
postRoutes.get("/category/:id", getPostsByCategoryCtrl);

//DELETE/post/
postRoutes.delete("/:id", isLogin, isAdmin, deletePostCtrl);

//UPDATE/post/
postRoutes.put(
  "/:id",
  isLogin,
  isAdmin,
  upload.single("image"),
  updatePostCtrl
);

module.exports = postRoutes;
