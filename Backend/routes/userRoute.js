import express from "express";
import {
  registerUser,
  loginUser,
  adminLogin,
} from "../conotrollers/userController.js";
const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/admin", adminLogin);

export default userRoute;
