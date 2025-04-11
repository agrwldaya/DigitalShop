import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }
    // Remove 'Bearer ' prefix if present
    token = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach userId to request body
    req.body.userId = decoded.id;
    next();
    
  } catch (error) {
    let message = "Invalid token";
    
    if (error.name === "TokenExpiredError") {
      message = "Token expired. Please login again.";
    } else if (error.name === "JsonWebTokenError") {
      message = "Invalid token. Please provide a valid one.";
    }

    return res.status(401).json({
      success: false,
      message,
      error: error.message
    });
  }
};
