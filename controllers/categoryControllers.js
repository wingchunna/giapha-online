const Category = require("../../model/category");
const { appError, notFound } = require("../../middlewares/appError");
const moment = require("moment");
//@desc Register Category
//@route Category /api/v1/Categorys/register
//@access Private/Admin

const addCategoryCtrl = async (req, res, next) => {
  //check Category exits
  try {
    let { name } = req.body;
    if (name) {
      const categoryFound = await Category.findOne({ name });
      if (categoryFound) {
        return next(appError("Danh mục đã tồn tại", 403));
      }
      //create Category
      const category = await Category.create({
        name,
        avatarImage: req?.file?.path,
        author: req.userAuth,
      });
      // send response
      res.status(201).json({
        data: Category,
        status: "success",
        message: "Thêm mới Danh mục thành công !",
      });
    } else {
      return next(appError("Bạn cần nhập đầy đủ thông tin danh mục !", 403));
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get Category by name
//@route GET /api/v1/Categorys/
//@access Private/Admin

const getAllCategoryCtrl = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return next(appError("Không tìm thấy danh sách danh mục !", 403));
    }
    res.status(201).json({
      categories,
      status: "success",
      message: "Tìm kiếm danh sách danh mục thành công !",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get Category By Id
//@route GET /api/v1/Categorys/:id
//@access Private/Admin

const getCategoryByIdCtrl = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      next(appError("Không tìm thấy danh mục !", 403));
    }
    res.status(201).json({
      category,
      status: "success",
      message: "Tìm kiếm danh mục thành công !",
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

//@desc Update Category
//@route PUT /api/v1/Categorys/:id
//@access Private/Admin

const updateCategoryCtrl = async (req, res, next) => {
  try {
    let { name } = req.body;
    if (name) {
      const categoryFound = await Category.findOne({ name });
      if (!categoryFound) {
        return next(appError("Danh mục không tồn tại !", 403));
      }
      //update Category
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
          name,
          avatarImage: req?.file?.path,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json({
        message: "Cập nhật danh mục thành công !",
        status: "success",
      });
    } else {
      return next(appError("Bạn cần nhập đầy đủ thông tin danh mục !", 403));
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Delete Category
//@route delete /api/v1/Categorys/:id
//@access Private/Admin

const deleteCategoryCtrl = async (req, res, next) => {
  try {
    const categoryFound = await Category.findById(req.params.id);
    if (
      categoryFound.posts.lengh !== 0 ||
      categoryFound.images.lengh !== 0 ||
      categoryFound.videos.lengh !== 0
    ) {
      return next(
        appError(
          "Bạn cần xóa bài viết, video, ảnh trước khi xóa danh mục !",
          500
        )
      );
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: "Xóa danh mục thành công !",
      status: "success",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

module.exports = {
  addCategoryCtrl,
  getAllCategoryCtrl,
  getCategoryByIdCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
};
