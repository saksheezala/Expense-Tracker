import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';

const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, no token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, user not found"
            });
        }

        req.user = user; // ✅ FIXED: attach user to request

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed"
        });
    }
};

export { protect };