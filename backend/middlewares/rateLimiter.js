import rateLimit from "express-rate-limit";

//Global API rate limiter
export const globalLimiter = rateLimit({
    windowMs: 15 * 60* 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        message:
        "Too many requests from this IP, Please try again after 15 minutes",
    },
});

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 
        "Too many authentication attempts from this IP, Please try again after 15 minutes",
    },
});