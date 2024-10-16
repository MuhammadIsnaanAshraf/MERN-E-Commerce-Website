import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../conotrollers/orderController.js";
import authAdmin from "../middlewares/authAdmin.js";
import useAuth from "../middlewares/useAuth.js";

const Router = express.Router();

Router.post("/list", authAdmin, allOrders);
Router.post("/update", authAdmin, updateStatus);

Router.post("/place", useAuth, placeOrder);
Router.post("/stripe", useAuth, placeOrderStripe);
Router.post("/razorpay", useAuth, placeOrderRazorpay);

Router.post("/", useAuth, userOrders);
Router.post("/verifyStripe", useAuth, verifyStripe);

export default Router;
