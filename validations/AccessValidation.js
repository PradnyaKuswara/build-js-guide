import jwt from "jsonwebtoken";

export const Authentication = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
        message: "unauthorized",
        });
    }

    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    try {
        const jwtDecode = jwt.verify(token, secret);

        req.users = jwtDecode;
    } catch (error) {
        return res.status(401).json({
            message: "unauthorized",
            message_error: error.message,
        });
    }
    return next();
};

// export const Authorization = (roles) => {
//     return (req, res, next) => {
//         try {
//             if(req.header.Authorization && req.header.Authorization.startWith('Bearer')) {
//                 const token = req.header.Authorization.split(' ')[1];

//                 const decoded = jwt.verify(token, process.env.JWT_SECRET);

//                 if(!roles.includes(decoded.role)) {
//                     return res.status(401).json({
//                         message: 'unauthorized'
//                     });
//                 }

//                 req.user = decoded;
//                 next();
//             }
//         } catch (error) {
//             next(error);
//         }
//     }
// }

