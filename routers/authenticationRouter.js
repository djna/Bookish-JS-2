
import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (!username || !password) {
        res.status(400).send({errors: ['Query params must contain both `username` and `password`']})
    } else {
        Promise.resolve( { displayName: "dummy"})
            .then(user => {
                res.status(200).send({
                    message: `Welcome, ${user.displayName}!`,
                    token: "dummyToken"
                });
            })
            .catch(error => {
                res.status(400).send({errors: [
                    'Unable to match username and password to a valid user',
                    error.message
                ]})
            });
    }
});

router.use((req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        next();
    } else {
        return res.status(403).send({
            success: false,
            message: 'Invalid token'
        });
    }
});

export default router;
