"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../models/user"));
const config_1 = __importDefault(require("../config"));
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = require("passport-local");
const localOptions = { usernameField: 'email' };
const localLogin = new passport_local_1.Strategy(localOptions, (email, password, done) => {
    user_1.default.findOne({ email }).then(user => {
        if (!user)
            return done(null, false);
        user.verifyPassword(password, (err, isMatch) => {
            if (err)
                return done(err);
            if (!isMatch)
                return done(null, false);
            return done(null, user);
        });
    }).catch((err) => done(err));
});
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromHeader('authorization'),
    secretOrKey: config_1.default.secret
};
const jwtLogin = new passport_jwt_1.Strategy(jwtOptions, async ({ sub }, done) => {
    try {
        const user = await user_1.default.findById(sub).exec();
        if (!user)
            return done(null, false);
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
});
passport_1.default.use(jwtLogin);
passport_1.default.use(localLogin);
exports.default = passport_1.default;
