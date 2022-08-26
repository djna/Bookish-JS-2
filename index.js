
import BookRouter from './routers/bookRouter.js';
import AuthenticationRouter from './routers/authenticationRouter.js';
import express from 'express';

const app = express();

app.use(express.json());

app.use('/', AuthenticationRouter  );
app.use('/books', BookRouter  );

// handle errors, log diagnostic, give user simple error message
app.use(function (err, req, res, next) {
  console.error( err );
  res.status(500).send('System unable to process request, please try later.')
})


app.listen(3000, () => console.log('\nBookish listening on port 3000'));

