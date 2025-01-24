const jwt = require('jsonwebtoken');
const { sendError } = require('./responseHandler');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

exports.auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return sendError(res, { message: 'No token provided' }, 401);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        sendError(res, { message: 'Invalid token' }, 401);
    }
};