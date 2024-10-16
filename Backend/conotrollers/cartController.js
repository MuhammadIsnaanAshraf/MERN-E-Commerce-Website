import express from "express";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  const { userId, itemId, size } = req.body;
  try {
    const userData = await userModel.findById(userId);

    console.log(userData);
    const cartData = userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    const respone = await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item added successfully" });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};
const updateCart = async (req, res) => {
  const { userId, itemId, size, quantity } = req.body;
  try {
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData;
    cartData[itemId][size] = quantity;
    const respone = await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    res.json({ success: true, message: "Cart Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const getCart = async (req, res) => {
  const { userId } = req.body;
  try {
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export { addToCart, getCart, updateCart };
