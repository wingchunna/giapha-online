const express = require("express");
const {
  addGenCtrl,
  getAllGenCtrl,
  getGenByIdCtrl,
  updateGenCtrl,
  deleteGenCtrl,
} = require("../controllers/generationControllers");
const isLogin = require("../middlewares/isLogin");
const isAdmin = require("../middlewares/isAdmin");

const genRoutes = express.Router();

//Gen/add
genRoutes.post("/", isLogin, isAdmin, addGenCtrl);

//GET/Gen/
genRoutes.get("/", getAllGenCtrl);

//GET/Gen/:id
genRoutes.get("/:id", getGenByIdCtrl);

//DELETE/Gen/
genRoutes.delete("/:id", isLogin, isAdmin, deleteGenCtrl);

//UPDATE/Gen/
genRoutes.put("/:id", isLogin, isAdmin);

module.exports = genRoutes;
