import { Request, Response } from 'express';
import { logIn } from './controllers/authentication';
import passport from './services/passport';
import { getSentences, setFixedSentences } from './controllers/sentences';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


export default (app: any) => {

    app.get('/', requireAuth, (req: Request, res: Response) => {
        res.send({ success: true })
    })


    app.post('/login', requireLogin, logIn);


    app.get('/sentences', getSentences);
    app.post('/fix-data', setFixedSentences);
}