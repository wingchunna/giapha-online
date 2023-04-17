const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema(
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

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

module.exports = Image;
