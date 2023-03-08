"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function checkLogin(req, res, next) {
    const JWT = req.headers.authorization;
    const { id } = req.body;
    if (!JWT) {
        return res.status(401).end();
    }
    const [bearer, token] = JWT.split(' ');
    try {
        const decodedToken = (0, jsonwebtoken_1.verify)(token, process.env.JWT_KEY);
        return next();
    }
    catch (error) {
        return res.status(401).end();
    }
}
exports.checkLogin = checkLogin;
