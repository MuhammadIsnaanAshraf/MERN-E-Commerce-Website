import express from "express";
import {
  getCart,
  updateCart,
  addToCart,
} from "../conotrollers/cartController.js";
import useAuth from "../middlewares/useAuth.js";
const Router = express.Router();

Router.post("/add", useAuth, addToCart);
Router.post("/update", useAuth, updateCart);
Router.post("/get", useAuth, getCart);

export default Router;
