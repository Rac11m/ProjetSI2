const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Login collection
const loginSchema = new mongoose.Schema({
  matricule: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Create the model for the Login collection
const Login = mongoose.model("Login", loginSchema);

function validateLogin(login) {
  const schema = Joi.object({
    matricule: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    role: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(login);
}

exports.Login = Login;
exports.validateLogin = validateLogin;
