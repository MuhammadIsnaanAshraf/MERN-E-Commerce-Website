import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      sizes,
      category,
      subCategory,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_image: "image",
        });
        return result.secure_url;
      })
    );

    console.log(
      name,
      description,
      price,
      sizes,
      category,
      subCategory,
      bestSeller
    );

    const productData = {
      name,
      description,
      price: Number(price),
      sizes: JSON.parse(sizes),
      category,
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);

    await product.save();

    return res.json({ success: true, message: "Product Added successfully" });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: error.message });
  }
};
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: error.message });
  }
};
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await productModel.findByIdAndDelete(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: error.message });
  }
};
const singleProduct = async (req, res) => {
  const { id } = req.body;
  const product = await productModel.findById(id);
  if (product) {
    res.json({ success: true, product });
  } else {
    res.json({ success: false, message: "Product does not exist" });
  }
};
export { addProduct, listProducts, removeProduct, singleProduct };
