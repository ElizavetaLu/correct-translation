"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
});
userSchema.pre('save', function (next) {
    const user = this;
    bcryptjs_1.default.genSalt(10, (err, salt) => {
        if (err)
            return next(err);
        bcryptjs_1.default.hash(user.password, salt, (err, hash) => {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.verifyPassword = function (candidatePassword, callback) {
    bcryptjs_1.default.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err)
            return callback(err);
        callback(null, isMatch, { message: "Not a valid password" });
    });
};
const User = mongoose_1.default.model('user', userSchema);
exports.default = User;
