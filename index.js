
import BookRouter from './routers/bookRouter.js';
import AuthenticationRouter from './routers/authenticationRouter.js';
import express from 'express';

import passport from 'passport';
import passportJwt from 'passport-jwt';
import { secret } from "./config.js";
import UserRepository from './repositories/userRepository.js';

const app = express();

app.use(express.json());

configurePassportToAuthenticateTokens();

// We will use passport to verify credentials
// We add it to each route we want to protect
// We use only jwt, but passport can work with many other credentials as well.
app.use(passport.initialize());

// no passport check until we log in
app.use('/login', AuthenticationRouter  );

// add passport in front of each router we want to protect
app.use('/books', passport.authenticate('jwt', {session: false}), BookRouter  );

// handle errors, log diagnostic, give user simple error message
app.use(function (err, req, res, next) {
  console.error( err );
  res.status(500).send('System unable to process request, please try later.')
})

app.listen(3000, () => console.log('\nBookish listening on port 3000'));

// provide passport with a way to validate user
function configurePassportToAuthenticateTokens() {
    // Ensure that there is a valid JSON Web Token
    const jwtOptions = {};
    jwtOptions.jwtFromRequest = passportJwt.ExtractJwt.fromHeader('x-access-token');
    jwtOptions.secretOrKey = secret;
    const userRepository = new UserRepository();
    passport.use(new passportJwt.Strategy(jwtOptions, async (decodedJwt, next) => {
        try {
           let user = await userRepository.getUserByName(decodedJwt.username);
           // first param null means no error
           next(null, user);
        } catch( e ){
            console.log("Authentication error ", e);
            // report error in first param
            next('authentication failure: ' + decodedJwt.username);
        }
    }));
}
