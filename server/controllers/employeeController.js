const filter_removeSensitiveInfo = require("../utils/filterRMSensiInfo");
const employeeModel = require("../models/employee");

module.exports.create = async (req, res, next) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;

    const existingUser = await employeeModel.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res.status(200).json({
        status: false,
        error: "User with the same mobile or email already exists",
      });
    }

    let id = `SNO_${Math.floor(Math.random() * 1000)}`;
    try {
      const newEmployee = await employeeModel.create({
        id,
        name,
        email,
        mobile,
        designation,
        gender,
        course,
      });

      const filteredNewEmployee = filter_removeSensitiveInfo(
        newEmployee.toObject()
      );

      res.status(201).json({
        status: true,
        data: filteredNewEmployee,
        msg: "Employee creation successful",
      });
    } catch (err) {
      if (err.errors.email && err.errors.phone) {
        return res.status(200).json({
          status: false,
          error: "Both email and phone are invalid",
        });
      } else if (err.errors.email) {
        return res.status(200).json({
          status: false,
          error: "Email is invalid",
        });
      } else if (err.errors.mobile) {
        return res.status(200).json({
          status: false,
          error: "Phone is invalid",
        });
      } else {
        return res.status(200).json({
          status: false,
          error: "Something went wrong",
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getAllEmp = async (req, res, next) => {
  try {
    const allEmployees = await employeeModel.find();

    res.status(200).json({
      status: true,
      data: allEmployees,
      msg: "All Employees data are being fetched",
    });
  } catch (err) {
    next(err);
  }
};

module.exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, error: "Invalid ID provided" });
    }

    const removedEmployee = await employeeModel.findByIdAndDelete(id);

    if (!removedEmployee) {
      return res
        .status(404)
        .json({ status: false, error: "Employee not found" });
    }

    const filteredRemovedEmployee = filter_removeSensitiveInfo(
      removedEmployee.toObject()
    );

    res.status(200).json({
      status: true,
      message: "Employee removed successfully",
      data: filteredRemovedEmployee,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, course } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, error: "Invalid ID provided" });
    }

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobile,
        designation,
        gender,
        course,
      },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ status: false, error: "Employee not found" });
    }

    const filteredUpdatedEmployee = filter_removeSensitiveInfo(
      updatedEmployee.toObject()
    );

    res.status(200).json({
      status: true,
      message: "Employee updated successfully",
      data: filteredUpdatedEmployee,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res
        .status(400)
        .json({ status: false, error: "Invalid ID format" });
    } else if (err.name === "ValidationError") {
      return res.status(400).json({ status: false, error: err.message });
    }

    next(err);
  }
};
