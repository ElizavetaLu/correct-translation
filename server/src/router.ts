import { getSentences, setBrandNewSentence, setCorrectedSentence } from './controllers/sentences';
import { logIn } from './controllers/authentication';
import passport from './services/passport';
import { checkToken } from './middleware/checkToken';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


export default (app: any) => {

    app.get('/', requireAuth, (req: any, res: any) => {
        res.send({ success: true })
    })

    app.post('/login', requireLogin, logIn);
 
    app.get('/sentences', checkToken, getSentences);
    app.post('/new-sentence', checkToken, setBrandNewSentence);
    app.post('/corrected-sentence', checkToken, setCorrectedSentence);
}
