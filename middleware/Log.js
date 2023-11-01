export const logRequest = (req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    next();
};