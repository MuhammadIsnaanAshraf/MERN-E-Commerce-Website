import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
const currency = "inr";
const deliveryCharges = 10;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// COD
const placeOrder = async (req, res) => {
  const { userId, items, amount, adress } = req.body;
  try {
    const orderData = {
      userId,
      items,
      amount,
      adress,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    const updatingUserCart = await userModel.findByIdAndUpdate(
      userId,
      { $set: { cartData: {} } },
      { runValidators: false }
    );
    console.log(updatingUserCart);

    res.json({ success: true, message: "Order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// Stripe
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, adress } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      adress,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const verifyStripe = async (req, res) => {
  try {
    const { orderId, success, userId } = req.body;
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await orderModel.findByIdAndUpdate(userId, { $set: { cartData: {} } });
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "payment not successfully done." });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// Razorpay
const placeOrderRazorpay = async (req, res) => {};
// Admin Panel Orders
const allOrders = async (req, res) => {
  try {
    const order = await orderModel.find({});
    // console.log(order);
    res.json({ success: true, order });
  } catch (error) {
    // console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// User Orders
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// updateStatus
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await orderModel.findByIdAndUpdate(orderId, { status });
    console.log(order);
    res.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
};
