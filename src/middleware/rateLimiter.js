const rateLimit = require('express-rate-limit');

exports.limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per windowMs
    message: {
        success: false,
        error: 'Too many requests, please try again later'
    }
});