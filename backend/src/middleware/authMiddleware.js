const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {

  try {

    // Get token from request header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Remove "Bearer " from token
    const actualToken = token.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    // Continue to next middleware
    next();

  } catch (error) {

    res.status(401).json({ message: "Invalid token" });

  }

};

// Middleware for role based access
exports.authorizeRoles = (...roles) => {

  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();

  };

};