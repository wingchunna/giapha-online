const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    avatarImage: {
      type: String,
    },
    url: {
      type: String,
      require: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//compile Schema

const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

module.exports = Video;
