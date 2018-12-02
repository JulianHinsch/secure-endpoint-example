require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const sanitize = require('sanitize').middleware;

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

const corsOptions =  {
  origin: 'http://localhost:3000'
};


const app = express();

app.use(sanitize);
app.use(bodyParser.json({extended: true}));
app.use(cors(corsOptions));

require('./routes')(app);

app.use(express.static(__dirname+'/client/build'));

app.use((req,res,next) => {
	const err = new Error('Internal Server Error');
	err.status = 500;
	next(err);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port:${port}`));

module.exports = app;
