import jwt from 'jsonwebtoken';
import { User } from '../models/user.schema.js';

const checkToken = async (req, res, next) => {
  const accessToken = req.cookies['accessToken'];

  if (accessToken) {
    try {
      // console.log(accessToken)
      const decode = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      // console.log(decode)
      // const user = await User.findOne({ email:decode.email });

      req.user = decode;
      // console.log(req.user);
      next();
    } catch (error) {
      console.log("invalid access token");
      res.status(401).json({ message: "Unauthorized Access" });
    }
  } else {

    try {
      const refreshToken = req.cookies["refreshToken"];
      
      if (!refreshToken) {
        console.log("Neither Access nor Refresh token is present");
        return res.status(401).json({ message: "Unauthorized Access" });
      };

      const decode = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
      
      const newAccessToken = jwt.sign(
        { email: decode.email, role: decode.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
     
      res.cookie("accessToken", newAccessToken, { maxAge: 60 * 60 * 1000, });

      // const user = await User.findOne({ email:decode.email });

      req.user = decode;

      next();
    } catch (error) {
      console.log("invalid refresh token");
      res.status(401).json({ message: "Unauthorized Access" });
    }
  }
};

const checkRole = (...role) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      if (!role.includes(user.role)) {
        throw new Error("Unauthorized access");
      }
      else {
        next();
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
}


export { checkToken, checkRole };