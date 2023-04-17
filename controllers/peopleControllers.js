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
      dateOfBirth,
      dateOfBirthLunar,
      dateOfDead,
      dateOfDeadLunar,
      gender,
      address,
      currentAddr,
      email,
      phone,
      patrons,
      isDead,
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
      jobTitle,
      workingAddress,
      restingPlace,
    } = req.body;
    if (firstName && lastName) {
      const fullName = firstName + " " + lastName;
      const peopleFound = await People.findOne({ fullName });
      if (peopleFound) {
        if (peopleFound.dateOfBirth === dateOfBirth) {
          return next(appError("Phả nhân đã tồn tại !", 403));
        }
      }

      //create People

      const people = await People.create({
        firstName,
        lastName,
        commonName,
        calledName,
        otherName,
        dateOfBirth,
        dateOfBirthLunar,
        dateOfDead,
        dateOfDeadLunar,
        gender,
        address,
        currentAddr,
        email,
        phone,
        avatar: req?.file?.path,
        patrons,
        isDead,
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
        jobTitle,
        workingAddress,
        restingPlace,
      });
      // push people to People
      // send response
      res.status(201).json({
        data: People,
        status: "success",
        message: "Thêm mới phả nhân thành công !",
      });
    } else {
      return next(appError("Bạn cần nhập đầy đủ thông tin phả nhân !", 403));
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
    const peoples = await People.find();
    if (!peoples) {
      return next(appError("Không tìm thấy danh sách phả nhân", 403));
    }
    res.status(201).json({
      peoples,
      status: "success",
      message: "Tìm kiếm danh sách phả nhân thành công !",
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
    const people = await People.findById(req.params.id);
    if (!people) {
      next(appError("Không tìm thấy phả nhân !", 403));
    }
    res.status(201).json({
      people,
      status: "success",
      message: "Tìm kiếm phả nhân thành công !",
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
    let {
      firstName,
      lastName,
      commonName,
      calledName,
      otherName,
      dateOfBirth,
      dateOfBirthLunar,
      dateOfDead,
      dateOfDeadLunar,
      gender,
      address,
      currentAddr,
      email,
      phone,
      patrons,
      isDead,
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
      jobTitle,
      workingAddress,
      restingPlace,
    } = req.body;

    //create People

    const People = await People.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        commonName,
        calledName,
        otherName,
        dateOfBirth,
        dateOfBirthLunar,
        dateOfDead,
        dateOfDeadLunar,
        gender,
        address,
        currentAddr,
        email,
        phone,
        avatar: req?.file?.path,
        patrons,
        isDead,
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
        jobTitle,
        workingAddress,
        restingPlace,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({
      message: "Cập nhật phả nhân thành công !",
      status: "success",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Delete People
//@route delete /api/v1/Peoples/:id
//@access Private/Admin

const deletePeopleCtrl = async (req, res, next) => {
  try {
    const people = await People.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: "Xóa phả nhân thành công !",
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
