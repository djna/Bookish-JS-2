
import UxController from './controllers/uxController.js';

import express from 'express';
import nocache from 'nocache';

const app = express();

// disable caching
app.use(nocache());
app.set('etag', false); 

app.use('/ux', UxController);

// handle errors, log diagnostic, give user simple error message
app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).send('System unable to process request, please try later.')
})

app.listen(3000, () => console.log('\nBookish listening on port 3000'));
