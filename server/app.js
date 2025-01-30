const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// const whitelist = ['http://localhost:3000', 'https://statera-app.netlify.app'];
var corsOptions = {
  origin:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://statera-app.netlify.app',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use('/auth', require('./controllers/authController'));
app.use('/users', require('./controllers/usersController'));
app.use('/transactions', require('./controllers/transactionsController'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

app.get('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

module.exports = app;
