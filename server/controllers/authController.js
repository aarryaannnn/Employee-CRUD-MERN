const filter_removeSensitiveInfo = require("../utils/filterRMSensiInfo");
const serial_no_generator = require("../utils/generateSerialNo");
const loginModel = require("../models/login");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let existing = await loginModel.findOne({ username });

    if (!existing) {
      return res.status(200).json({
        status: false,
        error: "Username or Password incorrect",
      });
    }

    const isAuthenticate = password === existing.password;

    if (!isAuthenticate) {
      return res.status(200).json({
        status: false,
        error: "Username or Password incorrect",
      });
    }

    const login_data = filter_removeSensitiveInfo(existing, "password");

    return res.status(200).json({
      status: true,
      data: login_data,
      msg: "Login Successful",
    });
  } catch (err) {
    next(err);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let existing = await loginModel.findOne({ username });
    if (existing) {
      return res.status(200).json({
        status: false,
        error: "Username already exists",
      });
    }

    const s_no = serial_no_generator();

    const registerUser = await loginModel.create({
      s_no,
      username,
      password,
    });

    if (!registerUser) {
      return res.status(200).json({
        status: false,
        error: "Some error occurred while registering the user",
      });
    }

    const register_data = filter_removeSensitiveInfo(registerUser, "password");

    res.status(201).json({
      status: true,
      data: register_data,
      msg: "Registration successful",
    });
  } catch (err) {
    next(err);
  }
};
