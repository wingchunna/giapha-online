const express = require("express");
const {
  addCategoryCtrl,
  getAllCategoryCtrl,
  getCategoryByIdCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} = require("../../controller/categoryController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const categoryRoutes = express.Router();

//Category/add
categoryRoutes.post("/", isLogin, isAdmin, addCategoryCtrl);

//GET/Category/
categoryRoutes.get("/", getAllCategoryCtrl);

//GET/Category/:id
categoryRoutes.get("/:id", getCategoryByIdCtrl);

//DELETE/Category/
categoryRoutes.delete("/:id", isLogin, isAdmin, deleteCategoryCtrl);

//UPDATE/Category/
categoryRoutes.put("/:id", isLogin, isAdmin);

module.exports = categoryRoutes;
