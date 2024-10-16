import jwt from "jsonwebtoken";

const useAuth = async (req, res, next) => {
  const { token } = req.headers;
  console.log(token);
  if (!token) {
    res.json({ success: false, message: "User Not LogedIn !" });
  }
  try {
    const decode_token = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decode_token);
    // console.log(decode_token.id);
    req.body.userId = decode_token.id;
    // console.log(req.body.userId);
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export default useAuth;
