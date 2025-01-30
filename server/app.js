const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const whitelist = ['http://localhost:3000', 'https://statera-app.netlify.app'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log('origin:', origin, 'not allowed');
      callback(new Error('Not allowed by CORS'));
    }
  },
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
