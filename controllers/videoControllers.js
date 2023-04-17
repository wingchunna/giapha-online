const Video = require("../../model/video");
const Category = require("../../model/category");
const { appError, notFound } = require("../../middlewares/appError");
const moment = require("moment");
//@desc Register Video
//@route Video /api/v1/Videos/register
//@access Private/Admin

const addVideoCtrl = async (req, res, next) => {
  //check Video exits
  try {
    let { title, description, url, category } = req.body;
    if (title && description && category && url) {
      const videoFound = await Video.findOne({ title });
      if (videoFound) {
        return next(appError("Video đã tồn tại", 403));
      }
      //create Video
      const Video = await Video.create({
        title,
        description,
        avatarImage: req?.file?.path,
        url,
        category,
        author: req.userAuth,
      });

      // send response
      res.status(201).json({
        data: video,
        status: "success",
        message: "Thêm mới Video thành công !",
      });
    } else {
      return next(appError("Bạn cần nhập đầy đủ thông tin Video", 403));
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get Video by name
//@route GET /api/v1/Videos/
//@access Private/Admin

const getAllVideoCtrl = async (req, res, next) => {
  try {
    const videos = await Video.find();
    if (!videos) {
      return next(appError("Không tìm thấy danh sách Video", 403));
    }
    res.status(201).json({
      Videos,
      status: "success",
      message: "Tìm kiếm danh sách video thành công !",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get Image by category
//@route GET /api/v1/Images/
//@access Private/Admin

const getVideosByCategoryCtrl = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      next(appError("Không tìm thấy danh mục !", 403));
    }
    res.status(201).json({
      data: category.videos,
      status: "success",
      message: "Tìm kiếm danh sách video theo danh mục thành công !",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get Video By Id
//@route GET /api/v1/Videos/:id
//@access Private/Admin

const getVideoByIdCtrl = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      next(appError("Không tìm thấy Video !", 403));
    }
    res.status(201).json({
      video,
      status: "success",
      message: "Tìm kiếm Video thành công !",
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

//@desc Update Video
//@route PUT /api/v1/Videos/:id
//@access Private/Admin

const updateVideoCtrl = async (req, res, next) => {
  try {
    let { title, description, url, category } = req.body;
    if (title || description || url || category) {
      const videoFound = await Video.findOne({ title });
      if (!videoFound) {
        return next(appError("Video không tồn tại", 403));
      }

      //create Video

      const video = await Video.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          avatarImage: req?.file?.path,
          url,
          category,
          author: req.userAuth,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json({
        message: "Cập nhật Video thành công !",
        status: "success",
      });
    } else {
      return next(appError("Bạn cần nhập đầy đủ thông tin Video !", 403));
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Delete Video
//@route delete /api/v1/Videos/:id
//@access Private/Admin

const deleteVideoCtrl = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: "Xóa Video thành công !",
      status: "success",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

module.exports = {
  addVideoCtrl,
  getAllVideoCtrl,
  getVideoByIdCtrl,
  updateVideoCtrl,
  deleteVideoCtrl,
};
