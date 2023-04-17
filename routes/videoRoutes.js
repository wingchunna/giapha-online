const express = require("express");
const {
  addVideoCtrl,
  getAllVideoCtrl,
  getVideoByIdCtrl,
  updateVideoCtrl,
  deleteVideoCtrl,
  getImagesByCategoryCtrl,
} = require("../../controller/videoController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const storage = require("../../config/upload-video");
const multer = require("multer");
const upload = multer({ storage });

const videoRoutes = express.Router();

//Video/add
videoRoutes.post("/", isLogin, isAdmin, upload.single("video"), addVideoCtrl);

//GET/Video/
videoRoutes.get("/", isLogin, isAdmin, getAllVideoCtrl);

//GET/Video/:id
videoRoutes.get("/:id", getVideoByIdCtrl);

//GET/Video/:category_id
videoRoutes.get("/category/:id", getImagesByCategoryCtrl);

//DELETE/Video/
videoRoutes.delete("/:id", isLogin, isAdmin, deleteVideoCtrl);

//UPDATE/Video/
videoRoutes.put("/:id", isLogin, upload.single("video"), isAdmin);

module.exports = videoRoutes;
