import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Admin not authorized" });
    }
    const decode_token = jwt.verify(token, process.env.JWT_SECRET);
    if (decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Admin not authorized again",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: error.message });
  }
};

export default authAdmin;
