const express = require("express");
const {
  addImageCtrl,
  getAllImageCtrl,
  getImageByIdCtrl,
  updateImageCtrl,
  deleteImageCtrl,
} = require("../../controller/imageController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const imageRoutes = express.Router();

//Image/add
imageRoutes.post("/", isLogin, isAdmin, addImageCtrl);

//GET/Image/
imageRoutes.get("/", getAllImageCtrl);

//GET/Image/:id
imageRoutes.get("/:id", getImageByIdCtrl);

//DELETE/Image/
imageRoutes.delete("/:id", isLogin, isAdmin, deleteImageCtrl);

//UPDATE/Image/
imageRoutes.put("/:id", isLogin, isAdmin);

module.exports = imageRoutes;
