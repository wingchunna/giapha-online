const express = require("express");
const {
  addWebConfigCtrl,
  getAllWebConfigCtrl,
  getWebConfigByIdCtrl,
  updateWebConfigCtrl,
  deleteWebConfigCtrl,
} = require("../../controller/webConfigController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const webConfigRoutes = express.Router();

//WebConfig/add
webConfigRoutes.post("/", isLogin, isAdmin, addWebConfigCtrl);

//GET/WebConfig/
webConfigRoutes.get("/", getAllWebConfigCtrl);

//GET/WebConfig/:id
webConfigRoutes.get("/:id", getWebConfigByIdCtrl);

//DELETE/WebConfig/
webConfigRoutes.delete("/:id", isLogin, isAdmin, deleteWebConfigCtrl);

//UPDATE/WebConfig/
webConfigRoutes.put("/:id", isLogin, isAdmin);

module.exports = webConfigRoutes;
