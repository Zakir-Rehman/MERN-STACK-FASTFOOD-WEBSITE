import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ success: false, message: "No token provided" });

  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ success: false, message: "Invalid token" });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.id; // ye userId route handler me milega
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
