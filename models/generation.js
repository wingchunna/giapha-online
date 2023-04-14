const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const generationSchema = new Schema(
  {
    gen: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//compile Schema

const Generation =
  mongoose.models.Generation || mongoose.model("Generation", GenerationSchema);

module.exports = Generation;
