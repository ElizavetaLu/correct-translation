import passport from 'passport';
import User from '../models/user';
import config from '../config';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';


const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email: string, password: string, done: VerifiedCallback) => {

    User.findOne({ email }).then(user => {

        if (!user) return done(null, false);
        user.verifyPassword(password, (err: Error, isMatch: boolean) => {

            if (err) return done(err);
            if (!isMatch) return done(null, false);

            return done(null, user)
        })

    }).catch((err: Error) => done(err))
})



const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async ({ sub }, done) => {
    try { 
        const user = await User.findById(sub).exec();

        if (!user) return done(null, false);

        return done(null, user);

    } catch (err) {
        return done(err);
    }
});

passport.use(jwtLogin);
passport.use(localLogin);

export default passport