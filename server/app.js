const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/users', require('./controllers/usersController'));
app.use('/transactions', require('./controllers/transactionsController'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

app.get('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

module.exports = app;
