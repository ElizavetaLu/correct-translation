"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkToken = (req, res, next) => {
    const token = req.headers.authorization;
    jsonwebtoken_1.default.verify(token, config_1.default.secret, (err, decodedToken) => {
        if (err)
            return res.status(401).json({ error: err });
        if (!decodedToken)
            return res.status(400).json({ error: 'User does not exist' });
        req.user = decodedToken.sub;
        next();
    });
};
exports.checkToken = checkToken;
