import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import config from '../config';

function tokenForUser(user: IUser): string {
    const timestamp = new Date().getTime();
    return jwt.sign({ sub: user._id, iat: timestamp }, config.secret);
}

export const logIn = (req: Request, res: Response, next: NextFunction) => {

    const user = req.body as IUser;

    if (!user) {
        res.status(422).json({ error: 'No user provided.' });
        return;
    }
    res.status(200).json({ token: tokenForUser(user) });
};

// const user = new User({ email: "", password: "" });
// user.save();