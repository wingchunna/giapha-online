const express = require("express");
const {
  addWebConfigCtrl,
  getWebConfigCtrl,
  updateWebConfigCtrl,
} = require("../../controller/webConfigController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const webConfigRoutes = express.Router();

//WebConfig/add
webConfigRoutes.post(
  "/",
  isLogin,
  isAdmin,
  upload.single("image"),
  addWebConfigCtrl
);

//GET/WebConfig/
webConfigRoutes.get("/", getWebConfigCtrl);

//UPDATE/WebConfig/
webConfigRoutes.put(
  "/:id",
  isLogin,
  isAdmin,
  upload.single("image"),
  updateWebConfigCtrl
);

module.exports = webConfigRoutes;
