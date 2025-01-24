const User = require('../models/userModel');
const { sendResponse, sendError } = require('../middleware/responseHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return sendError(res, { message: 'Invalid credentials' }, 401);
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        sendResponse(res, { token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (error) {
        sendError(res, error, 500);
    }
};