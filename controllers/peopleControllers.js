const People = require("../models/people");
const { appError, notFound } = require("../middlewares/appError");
const moment = require("moment");
//@desc Register People
//@route People /api/v1/Peoples/register
//@access Private/Admin

const addPeopleCtrl = async (req, res, next) => {
  //check People exits
  try {
    let {
      firstName,
      lastName,
      commonName,
      calledName,
      otherName,
      dob,
      dod,
      gender,
      address,
      currentAddr,
      alive,
      dad,
      mother,
      son,
      daughter,
      husband,
      wife,
      generation,
      branch,
      certificate,
      education,
      job,
      restingPlace,
    } = req.body;
    if (firstName && lastName) {
      const PeopleFound = await People.findOne({ title });
      if (PeopleFound) {
        return next(appError("People đã tồn tại", 403));
      }

      //create People

      const People = await People.create({
        title,
        content,
        image,
        category,
        // author: req.userAuth,
      });
      // push Product to People
      // send response
      res.status(201).json({
        data: People,
        status: "success",
        message: "Thêm mới People thành công !",
      });
    } else {
      return next(appError("Bạn cần nhập đầy đủ thông tin bài viết", 403));
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get People by name
//@route GET /api/v1/Peoples/
//@access Private/Admin

const getAllPeopleCtrl = async (req, res, next) => {
  try {
    const Peoples = await People.find();
    if (!Peoples) {
      return next(appError("Không tìm thấy danh sách bài viết", 403));
    }
    res.status(201).json({
      Peoples,
      status: "success",
      message: "Tìm kiếm danh sách bài viết thành công !",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get People By Id
//@route GET /api/v1/Peoples/:id
//@access Private/Admin

const getPeopleByIdCtrl = async (req, res, next) => {
  try {
    const People = await People.findById(req.params.id);
    if (!People) {
      next(appError("Không tìm thấy bài viết !", 403));
    }
    res.status(201).json({
      People,
      status: "success",
      message: "Tìm kiếm bài viết thành công !",
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

//@desc Update People
//@route PUT /api/v1/Peoples/:id
//@access Private/Admin

const updatePeopleCtrl = async (req, res, next) => {
  try {
    let { title, content, image, category } = req.body;
    if (title && content && image && category) {
      const PeopleFound = await People.findOne({ code });
      if (!PeopleFound) {
        return next(appError("People không tồn tại", 403));
      }

      //create People

      const People = await People.findByIdAndUpdate(
        req.params.id,
        {
          title,
          content,
          image,
          category,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json({
        message: "Cập nhật bài viết thành công !",
        status: "success",
      });
    } else {
      return next(appError("Bạn cần nhập đầy đủ thông tin bài viết !", 403));
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Delete People
//@route delete /api/v1/Peoples/:id
//@access Private/Admin

const deletePeopleCtrl = async (req, res, next) => {
  try {
    const People = await People.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: "Xóa bài viết thành công !",
      status: "success",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

module.exports = {
  addPeopleCtrl,
  getAllPeopleCtrl,
  getPeopleByIdCtrl,
  updatePeopleCtrl,
  deletePeopleCtrl,
};
