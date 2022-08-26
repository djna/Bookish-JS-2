

import express from 'express';

const app = express();

app.get('/books', (req, res) => {
            res.send("The Library is Closed");
});

app.listen(3000, () => console.log('\nBookish listening on port 3000'));

