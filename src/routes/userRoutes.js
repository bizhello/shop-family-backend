const express = require("express");
const {
  updateUserValidation,
  idUserValidation,
} = require("../../utils/validation");
const {
  getUsersName,
  getUserById,
  deleteUserById,
} = require("../controllers/userControllers");

const userRoutes = express.Router();

userRoutes.get("/", getUsersName);
userRoutes.get("/:userId", idUserValidation, getUserById);
userRoutes.delete("/:userId", idUserValidation, deleteUserById);

module.exports = {
  userRoutes,
};
