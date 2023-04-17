const Post = require("../models/post");
const Category = require("../models/category");
const { appError, notFound } = require("../middlewares/appError");
const moment = require("moment");
//@desc Register Post
//@route POST /api/v1/Posts/register
//@access Private/Admin

const addPostCtrl = async (req, res, next) => {
  //check Post exits
  try {
    let { title, content, image, category } = req.body;
    if (title && content && image && category) {
      const postFound = await Post.findOne({ title });
      if (postFound) {
        return next(appError("Post đã tồn tại", 403));
      }

      //create Post

      const Post = await Post.create({
        title,
        content,
        image,
        category,
      });
      // push Product to Post
      // send response
      res.status(201).json({
        data: Post,
        status: "success",
        message: "Thêm mới Post thành công !",
      });
    } else {
      return next(appError("Bạn cần nhập đầy đủ thông tin bài viết", 403));
    }
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get Post by name
//@route GET /api/v1/Posts/
//@access Private/Admin

const getAllPostCtrl = async (req, res, next) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      return next(appError("Không tìm thấy danh sách bài viết", 403));
    }
    res.status(201).json({
      Posts,
      status: "success",
      message: "Tìm kiếm danh sách bài viết thành công !",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get Image by category
//@route GET /api/v1/Images/
//@access Private/Admin

const getPostsByCategoryCtrl = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      next(appError("Không tìm thấy danh mục !", 403));
    }
    res.status(201).json({
      data: category.posts,
      status: "success",
      message: "Tìm kiếm danh sách bài viết theo danh mục thành công !",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

//@desc Get Post By Id
//@route GET /api/v1/Posts/:id
//@access Private/Admin

const getPostByIdCtrl = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      next(appError("Không tìm thấy bài viết !", 403));
    }
    res.status(201).json({
      Post,
      status: "success",
      message: "Tìm kiếm bài viết thành công !",
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

//@desc Update Post
//@route PUT /api/v1/Posts/:id
//@access Private/Admin

const updatePostCtrl = async (req, res, next) => {
  try {
    let { title, content, image, category } = req.body;
    if (title || content || image || category) {
      const postFound = await Post.findOne({ code });
      if (!postFound) {
        return next(appError("Post không tồn tại", 403));
      }
      //create Post
      const Post = await Post.findByIdAndUpdate(
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

//@desc Delete Post
//@route delete /api/v1/Posts/:id
//@access Private/Admin

const deletePostCtrl = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: "Xóa bài viết thành công !",
      status: "success",
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

module.exports = {
  addPostCtrl,
  getAllPostCtrl,
  getPostByIdCtrl,
  updatePostCtrl,
  deletePostCtrl,
  getPostsByCategoryCtrl,
};
