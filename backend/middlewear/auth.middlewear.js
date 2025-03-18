import jwt from 'jsonwebtoken';
import { User } from '../models/user.schema.js';

const extractToken = (authHeader) => {
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

const checkToken = async (req, res, next) => {
  const accessHeader = req.headers['accesstoken'];
  const refreshHeader = req.headers['refreshtoken'];

  const accessToken = extractToken(accessHeader);

  if (accessToken) {
    try {
      const decode = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      req.user = decode;
      return next();
    } catch (error) {
      console.log("Invalid access token");
    }
  }

  // Try refresh token
  const refreshToken = extractToken(refreshHeader);

  if (!refreshToken) {
    console.log("No valid tokens provided");
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const decode = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

    // Issue a new access token
    const newAccessToken = jwt.sign(
      { email: decode.email, role: decode.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Optionally: send new access token in response headers
    res.setHeader("x-new-access-token", newAccessToken);

    req.user = decode;
    next();
  } catch (error) {
    console.log("Invalid refresh token");
    res.status(401).json({ message: "Unauthorized Access" });
  }
};

const checkRole = (...role) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      if (!role.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      }

      next();
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
    }
  };
};

export { checkToken, checkRole };
