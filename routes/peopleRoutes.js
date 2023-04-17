const express = require("express");
const {
  addPeopleCtrl,
  getAllPeopleCtrl,
  getPeopleByIdCtrl,
  updatePeopleCtrl,
  deletePeopleCtrl,
} = require("../controllers/peopleControllers");
const isLogin = require("../middlewares/isLogin");
const isAdmin = require("../middlewares/isAdmin");
const storage = require("../../config/upload-people-image");
const multer = require("multer");
const upload = multer({ storage });

const peopleRoutes = express.Router();

//People/add
peopleRoutes.post("/", isLogin, isAdmin, upload.single("image"), addPeopleCtrl);

//GET/People/
peopleRoutes.get("/", getAllPeopleCtrl);

//GET/People/:id
peopleRoutes.get("/:id", getPeopleByIdCtrl);

//DELETE/People/
peopleRoutes.delete("/:id", isLogin, isAdmin, deletePeopleCtrl);

//UPDATE/People/
peopleRoutes.put(
  "/:id",
  isLogin,
  isAdmin,
  upload.single("image"),
  updatePeopleCtrl
);

module.exports = peopleRoutes;
