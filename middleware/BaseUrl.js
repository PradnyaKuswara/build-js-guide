let baseUrl = process.env.APP_URL;

if (process.env.NODE_ENV === "production") {
  baseUrl = "https://example.com";
}

export const baseEnvironment = (req,res,next) => {
    req.baseUrl = baseUrl;
    next();
};