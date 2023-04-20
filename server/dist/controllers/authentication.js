"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jsonwebtoken_1.default.sign({ sub: user._id, iat: timestamp }, config_1.default.secret);
}
const logIn = (req, res, next) => {
    const user = req.body;
    if (!user) {
        res.status(422).json({ error: 'No user provided.' });
        return;
    }
    res.status(200).json({ token: tokenForUser(user) });
};
exports.logIn = logIn;
// const user = new User({ email: "", password: "" });
// user.save();
