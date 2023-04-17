const WebConfig = require("../../model/webConfig");
const { appError, notFound } = require("../../middlewares/appError");
const moment = require("moment");
//@desc Register WebConfig
//@route WebConfig /api/v1/WebConfigs/register
//@access Private/Admin

const addWebConfigCtrl = async (req, res, next) => {
  //check WebConfig exits
  try {
    let { title, logo, hotline, address, email, leader, siteManager } =
      req.body;
    if (title && logo && hotline && address && email && leader && siteManager) {
      const webConfigFound = await WebConfig.find();
      if (webConfigFound) {
        return next(appError("WebConfig đã tồn tại", 403));
      }

      //create WebConfig

      const webConfig = await WebConfig.create({
        title,
        logo: req?.file?.path,
        hotline,
        address,
        email,
        leader,
        siteManager,
        author: req.userAuth,
      });

      // send response
      res.status(201).json({
        data: webConfig,
        status: "success",
        message: "Thêm mới WebConfig thành công !",
      });
    } else {
      return next(appError("Bạn cần nhập thông tin Webconfig", 403));
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get WebConfig By Id
//@route GET /api/v1/WebConfigs/:id
//@access Private/Admin

const getWebConfigCtrl = async (req, res, next) => {
  try {
    const WebConfig = await WebConfig.find();
    if (!webConfig) {
      next(appError("Không tìm thấy webconfig !", 403));
    }
    res.status(201).json({
      webConfig,
      status: "success",
      message: "Tìm kiếm webconfig thành công !",
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

//@desc Update WebConfig
//@route PUT /api/v1/WebConfigs/:id
//@access Private/Admin

const updateWebConfigCtrl = async (req, res, next) => {
  try {
    let { title, logo, hotline, address, email, leader, siteManager } =
      req.body;

    const webConfigFound = await WebConfig.find();
    if (!webConfigFound) {
      return next(appError("WebConfig không tồn tại", 403));
    }

    //create WebConfig

    await WebConfig.findOneAndUpdate(
      {
        title,
        logo: req?.file?.path,
        hotline,
        address,
        email,
        leader,
        siteManager,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({
      message: "Cập nhật webconfig thành công !",
      status: "success",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

module.exports = {
  addWebConfigCtrl,
  getWebConfigCtrl,
  updateWebConfigCtrl,
};
