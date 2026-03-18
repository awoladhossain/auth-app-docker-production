const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // Header থেকে token নাও
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Login First",
      });
    }

    // "Bearer TOKEN" থেকে শুধু TOKEN নাও
    const token = authHeader.split(" ")[1];

    // Token verify করো
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User খুঁজে বের করো
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Request এ user attach করো
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token is not valid",
    });
  }
};

module.exports = protect;
