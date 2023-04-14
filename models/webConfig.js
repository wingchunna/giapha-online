const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const webConfigSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    logo: {
      type: String,
      require: true,
    },
    hotline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    leader: {
      type: String,
      require: true,
    },
    siteManager: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//compile Schema

const WebConfig =
  mongoose.models.WebConfig || mongoose.model("WebConfig", webConfigSchema);

module.exports = WebConfig;
