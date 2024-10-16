import express from "express";
import cors from "cors";
import "dotenv/config";
import connectToDB from "./config/mongodb.js";
import cloudinaryConnect from "./config/cloudinary.js";
import userRoute from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;
connectToDB();
cloudinaryConnect();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("App is working");
});

app.use("/api/user", userRoute);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

app.listen(port, () => {
  console.log("App is listening on port ", port);
});
