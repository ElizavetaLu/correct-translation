import { RequestHandler } from "express";
import config from "../config";
import jwt from 'jsonwebtoken';


export const checkToken: RequestHandler = (req, res, next) => {

    const token = req.headers.authorization!;

    jwt.verify(token, config.secret, (err, decodedToken) => {
        if (err) return res.status(401).json({ error: err });

        if (!decodedToken) return res.status(400).json({ error: 'User does not exist' });

        req.user = decodedToken.sub;

        next();
    });
}