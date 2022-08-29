
import UserRepository from '../repositories/userRepository.js';
import { createTokenForUser, isTokenValid } from '../helpers/tokenHelper.js';

import express from 'express';

const router = express.Router();
const userRepo = new UserRepository();

// Authentication - routed from /logib
router.get('/', async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (!username || !password) {
        res.status(400).send({ errors: ['Query params must contain both `username` and `password`'] })
    } else {
        try {
            let user = await userRepo.getUser(username, password)

            res.status(200).send({
                message: `Welcome, ${user.displayName}!`,
                token: createTokenForUser(user)
            });
        } catch (error) {
            res.status(400).send({
                errors: [
                    'Unable to match username and password to a valid user',
                    error.message
                ]
            })
        }
    }
});



export default router;