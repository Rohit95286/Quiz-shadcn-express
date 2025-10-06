// jwt.utils.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Create a JWT token for a given user payload
 * @param {Object} user - The payload to encode
 * @param {string|number} expiresIn - Expiration time (default "1d")
 * @returns {string|null} JWT token
 */
export const createJWTToken = (user, expiresIn = "1d") => {
  if (!user) return null;

  const token = jwt.sign(user, process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY", {
    expiresIn,
    algorithm: "HS256", // explicitly set algorithm
  });

  return token;
};

/**
 * Middleware to decode JWT from Authorization header and attach payload to req.body
 */
export const decodeJWTMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({message: "Authorization token missing"});
    }

    const token = authHeader.split(" ")[1];

    // Verify and decode token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY",
      {
        algorithms: ["HS256"],
      }
    );

    // Attach decoded payload to request body
    req.body = {...req.body, ...decoded};

    next();
  } catch (err) {
    console.error("JWT decode error:", err.message);
    return res.status(401).json({message: "Invalid or expired token"});
  }
};

/**
 * Helper function to decode token without middleware (optional)
 */
export const decodeJWTToken = token => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY", {
      algorithms: ["HS256"],
    });
  } catch (err) {
    console.error("JWT decode error:", err.message);
    return null;
  }
};
