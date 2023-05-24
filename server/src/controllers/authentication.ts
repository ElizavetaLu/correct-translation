import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config';

function tokenForUser(user: IUser): string {
    const timestamp = new Date().getTime();
    return jwt.sign({ sub: user._id.toString(), iat: timestamp }, config.secret);
}

export const logIn = (req: Request, res: Response, next: NextFunction) => {

    const user = req.body as IUser;

    if (!user) return res.status(422).json({ error: 'No user provided.' });

    User.findOne({ email: user.email })
        .then(userObj => {

            if (!userObj) { return res.status(422).json({ error: 'User not found' }) };

            res.status(200).json({ token: tokenForUser(userObj) });
        })
        .catch(() => res.status(400).send({ error: 'Bad request' }))
};