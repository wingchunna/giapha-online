const express = require("express");
const {
  addImageCtrl,
  getAllImageCtrl,
  getImageByIdCtrl,
  updateImageCtrl,
  deleteImageCtrl,
  getImagesByCategoryCtrl,
  createAlbumImagesCtrl,
} = require("../../controller/imageController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const storage = require("../../config/upload-images");
const multer = require("multer");
const upload = multer({ storage });

const imageRoutes = express.Router();

//Image/add
imageRoutes.post("/", isLogin, isAdmin, upload.single("image"), addImageCtrl);

//Upload Images
imageRoutes.post(
  "/album/upload",
  isLogin,
  isAdmin,
  upload.array("images"),
  createAlbumImagesCtrl
);

//GET/Image/
imageRoutes.get("/", isAdmin, getAllImageCtrl);

//GET/Image/:id
imageRoutes.get("/:id", getImageByIdCtrl);

//GET/Image/:category_id
imageRoutes.get("/category/:id", getImagesByCategoryCtrl);

//DELETE/Image/
imageRoutes.delete("/:id", isLogin, isAdmin, deleteImageCtrl);

//UPDATE/Image/
imageRoutes.put(
  "/:id",
  isLogin,
  upload.single("image"),
  isAdmin,
  updateImageCtrl
);

module.exports = imageRoutes;
