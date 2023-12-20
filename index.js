const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());

// MySQL Database Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'halfpure',
  database: 'user_auth'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Endpoint for user sign-up
app.post('/api/signup', async (req, res) => {
  // Implement your signup logic here
});

// Endpoint for user login
app.post('/api/login', async (req, res) => {
  // Implement your login logic here
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
