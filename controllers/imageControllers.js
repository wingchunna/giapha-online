const Image = require("../../model/image");
const Category = require("../../model/category");
const { appError, notFound } = require("../../middlewares/appError");
const moment = require("moment");
//@desc Register Image
//@route Image /api/v1/Images/register
//@access Private/Admin

const addImageCtrl = async (req, res, next) => {
  //check Image exits
  try {
    let { title, description, category } = req.body;

    if (title && category) {
      //create Image

      const imageFound = await Image.findOne({ title });
      if (imageFound) {
        return next(appError("Hình ảnh đã tồn tại", 403));
      }

      const image = await Image.create({
        title,
        description,
        category,
        url: req?.file?.path,
        author: req.userAuth,
      });
      // send response
      res.status(201).json({
        data: image,
        status: "success",
        message: "Thêm mới hình ảnh thành công !",
      });
    } else {
      return next(appError("Bạn cần nhập đầy đủ thông tin hình ảnh !", 403));
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get Image by name
//@route GET /api/v1/Images/
//@access Private/Admin

const getAllImageCtrl = async (req, res, next) => {
  try {
    const images = await Image.find();
    if (!images) {
      return next(appError("Không tìm thấy danh sách hình ảnh", 403));
    }
    res.status(201).json({
      images,
      status: "success",
      message: "Tìm kiếm danh sách hình ảnh thành công !",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get Image by category
//@route GET /api/v1/Images/
//@access Private/Admin

const getImagesByCategoryCtrl = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      next(appError("Không tìm thấy danh mục !", 403));
    }
    res.status(201).json({
      data: category.images,
      status: "success",
      message: "Tìm kiếm danh sách hình ảnh theo danh mục thành công !",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get Image By Id
//@route GET /api/v1/Images/:id
//@access Private/Admin

const getImageByIdCtrl = async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      next(appError("Không tìm thấy hình ảnh !", 403));
    }
    res.status(201).json({
      image,
      status: "success",
      message: "Tìm kiếm hình ảnh thành công !",
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

//@desc Update Image
//@route PUT /api/v1/Images/:id
//@access Private/Admin

const updateImageCtrl = async (req, res, next) => {
  try {
    let { title, description, category } = req.body;
    //create Image
    const image = await Image.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        url: req?.file?.path,
        author: req.userAuth,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({
      message: "Cập nhật hình ảnh thành công !",
      status: "success",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Delete Image
//@route delete /api/v1/Images/:id
//@access Private/Admin

const deleteImageCtrl = async (req, res, next) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) {
      return next(appError("Hình ảnh không tồn tại !", 500));
    }
    res.status(201).json({
      message: "Xóa hình ảnh thành công !",
      status: "success",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Upload Images
//@route delete /api/v1/Images/:id
//@access Private/Admin

const uploadImagesCtrl = async(req, res, next) => {
  if(req?.files){
    
  }
  res.status(201).json({
    data: 
  })
}

module.exports = {
  addImageCtrl,
  getAllImageCtrl,
  getImageByIdCtrl,
  updateImageCtrl,
  deleteImageCtrl,
  getImagesByCategoryCtrl,
  uploadImagesCtrl,
};
