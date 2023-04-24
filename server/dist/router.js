"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("./controllers/authentication");
const passport_1 = __importDefault(require("./services/passport"));
const sentences_1 = require("./controllers/sentences");
const requireAuth = passport_1.default.authenticate('jwt', { session: false });
const requireLogin = passport_1.default.authenticate('local', { session: false });
exports.default = (app) => {
    app.get('/', requireAuth, (req, res) => {
        res.send({ success: true });
    });
    app.post('/login', requireLogin, authentication_1.logIn);
    app.get('/sentences', sentences_1.getSentences);
    app.post('/fix-data', sentences_1.setFixedSentence);
};
