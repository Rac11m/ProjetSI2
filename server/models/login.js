const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Login collection
const loginSchema = new mongoose.Schema({
  matricule: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Create the model for the Login collection
const Login = mongoose.model("Login", loginSchema);

function validateLogin(login) {
  const schema = Joi.object({});

  return schema.validate(login);
}

exports.Login = Login;
exports.validateLogin = validateLogin;
