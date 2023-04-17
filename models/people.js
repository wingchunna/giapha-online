const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const peopleSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
      default: "https://img.freepik.com/free-icon/man_318-188888.jpg",
    },
    commonName: {
      type: String,
    },
    calledName: {
      type: String,
    },
    otherName: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    dateOfBirthLunar: {
      type: String,
    },
    dateOfDead: {
      type: String,
    },
    dateOfDeadLunar: {
      type: String,
    },
    isDead: {
      type: Boolean,
      default: false,
    },

    address: {
      type: String,
    },
    currentAddress: {
      type: String,
    },
    gender: {
      type: String,
      require: true,
      enum: ["Nam", "Nữ", "Khác"],
    },
    dad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "People",
    },
    mother: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "People",
    },
    patrons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
      },
    ],
    son: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
      },
    ],
    daughter: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
      },
    ],
    husband: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
      },
    ],
    wife: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
      },
    ],
    generation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Generation",
      require: true,
    },
    branch: {
      type: String,
      require: true,
      enum: ["Chi trong", "Chi ngoài", "Chi Thanh Hóa"],
    },
    certificate: {
      type: String,
    },
    education: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    workingAddress: {
      type: String,
    },
    restingPlace: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// calculate people age
peopleSchema.virtual("age").get(function () {
  const people = this;
  let today = new Date();
  let birthDate = new Date(people.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  return age;
});
//compile Schema

const People = mongoose.models.People || mongoose.model("People", peopleSchema);

module.exports = People;
