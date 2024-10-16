import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existedUser = await userModel.findOne({ email });
    if (existedUser) {
      return res.json({ success: false, message: "User already exixts." });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email." });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password's length must be atleast 8.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = genToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not exists." });
    }
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res.json({ success: false, message: "Invalid password." });
    } else {
      const token = genToken(user._id);
      return res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials !" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export { registerUser, loginUser, adminLogin };
