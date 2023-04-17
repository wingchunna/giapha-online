const Generation = require("../models/Generation");
const { appError, notFound } = require("../middlewares/appError");
const moment = require("moment");
//@desc Register Generation
//@route Generation /api/v1/Generations/register
//@access Private/Admin

const addGenerationCtrl = async (req, res, next) => {
  //check Generation exits
  try {
    let { gen } = req.body;
    if (gen) {
      const generationFound = await Generation.findOne({ gen });
      if (generationFound) {
        return next(appError("Đời họ đã tồn tại", 403));
      }
      //create Generation
      const generation = await Generation.create({
        gen,
        // author: req.userAuth,
      });

      // send response
      res.status(201).json({
        data: generation,
        status: "success",
        message: "Thêm mới đời họ thành công !",
      });
    } else {
      return next(appError("Bạn cần nhập đầy đủ thông tin đời họ !", 403));
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get Generation by name
//@route GET /api/v1/Generations/
//@access Private/Admin

const getAllGenerationCtrl = async (req, res, next) => {
  try {
    const generations = await Generation.find();
    if (!generations) {
      return next(appError("Không tìm thấy danh sách đời họ", 403));
    }
    res.status(201).json({
      generations,
      status: "success",
      message: "Tìm kiếm danh sách đời họ thành công !",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get Generation By Id
//@route GET /api/v1/Generations/:id
//@access Private/Admin

const getGenerationByIdCtrl = async (req, res, next) => {
  try {
    const generation = await Generation.findById(req.params.id);
    if (!generation) {
      next(appError("Không tìm thấy đời họ !", 403));
    }
    res.status(201).json({
      generation,
      status: "success",
      message: "Tìm kiếm đời họ thành công !",
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

//@desc Update Generation
//@route PUT /api/v1/Generations/:id
//@access Private/Admin

const updateGenerationCtrl = async (req, res, next) => {
  try {
    let { gen } = req.body;
    if (gen) {
      const generationFound = await Generation.findOne({ gen });
      if (!generationFound) {
        return next(appError("Đời họ không tồn tại", 403));
      }

      //create Generation

      const generation = await Generation.findByIdAndUpdate(
        req.params.id,
        {
          gen,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json({
        message: "Cập nhật đời họ thành công !",
        status: "success",
      });
    } else {
      return next(appError("Bạn cần nhập đầy đủ thông tin đời họ !", 403));
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Delete Generation
//@route delete /api/v1/Generations/:id
//@access Private/Admin

const deleteGenerationCtrl = async (req, res, next) => {
  try {
    const generation = await Generation.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: "Xóa đời họ thành công !",
      status: "success",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

module.exports = {
  addGenerationCtrl,
  getAllGenerationCtrl,
  getGenerationByIdCtrl,
  updateGenerationCtrl,
  deleteGenerationCtrl,
};
