const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, // Email format validation
    validate: {
      validator: function (v) {
        // Your custom validation logic
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Custom validation for a 10-digit phone number
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: [String], // Representing an array of strings for checkboxes
    required: true,
    enum: ["MCA", "BCA", "BSC"], // Enumerating possible values
  },
  // Add image field
  image: {
    type: Buffer,
    contentType: String,
  },
});

// Validation function to check if the image is PNG or JPEG
employeeSchema.path("image").validate(function (value) {
  if (value) {
    const allowedTypes = ["image/png", "image/jpeg"];
    return allowedTypes.includes(this.image.contentType);
  }
  return true; // No image, so it's valid
}, "Invalid image type. Only PNG or JPEG images are allowed.");

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;
