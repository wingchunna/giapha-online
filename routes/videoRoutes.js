const express = require("express");
const {
  addVideoCtrl,
  getAllVideoCtrl,
  getVideoByIdCtrl,
  updateVideoCtrl,
  deleteVideoCtrl,
} = require("../../controller/videoController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const videoRoutes = express.Router();

//Video/add
videoRoutes.post("/", isLogin, isAdmin, addVideoCtrl);

//GET/Video/
videoRoutes.get("/", getAllVideoCtrl);

//GET/Video/:id
videoRoutes.get("/:id", getVideoByIdCtrl);

//DELETE/Video/
videoRoutes.delete("/:id", isLogin, isAdmin, deleteVideoCtrl);

//UPDATE/Video/
videoRoutes.put("/:id", isLogin, isAdmin);

module.exports = videoRoutes;
