const { JWT_SECRET_KEY } = require("./config");
const JWT=require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const AuthHeader = req.headers.authorization;

    if (AuthHeader && AuthHeader.startsWith('Bearer ')) {
        const token = AuthHeader.split(' ')[1];

        if (token) {
            JWT.verify(token, JWT_SECRET_KEY, (err, decodedData) => {
                if (err) {
                    return res.status(401).json({ message: "Invalid token", error: err });
                }
                req.user = decodedData;
                next();
            });
        } else {
            return res.status(401).json({ message: "Token not valid" });
        }
    } else {
        return res.status(401).json({ message: "Authorization header missing or malformed" });
    }
};
module.exports=authMiddleware;