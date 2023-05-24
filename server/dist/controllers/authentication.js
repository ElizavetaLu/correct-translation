"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jsonwebtoken_1.default.sign({ sub: user._id.toString(), iat: timestamp }, config_1.default.secret);
}
const logIn = (req, res, next) => {
    const user = req.body;
    if (!user)
        return res.status(422).json({ error: 'No user provided.' });
    user_1.default.findOne({ email: user.email })
        .then(userObj => {
        if (!userObj) {
            return res.status(422).json({ error: 'User not found' });
        }
        ;
        res.status(200).json({ token: tokenForUser(userObj) });
    })
        .catch(() => res.status(400).send({ error: 'Bad request' }));
};
exports.logIn = logIn;
