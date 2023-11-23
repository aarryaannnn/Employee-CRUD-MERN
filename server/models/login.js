const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  s_no: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const loginModel = mongoose.model("loginUsers", loginSchema);

module.exports = loginModel;
