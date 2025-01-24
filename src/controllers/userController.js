const User = require('../models/userModel');
const { sendResponse, sendError } = require('../middleware/responseHandler');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ active: true });
        sendResponse(res, users);
    } catch (error) {
        sendError(res, error, 500);
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return sendError(res, { message: 'User not found' }, 404);
        }
        sendResponse(res, user);
    } catch (error) {
        sendError(res, error, 500);
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const newUser = await user.save();
        sendResponse(res, newUser, 201);
    } catch (error) {
        if (error.code === 11000) {
            return sendError(res, { message: 'Email already exists' }, 409);
        }
        sendError(res, error);
    }
};