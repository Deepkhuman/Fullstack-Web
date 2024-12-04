const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Userschema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Usermodel = mongoose.model("Authuser", Userschema);

module.exports = { Usermodel };
