const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static HTML files (client side)
app.use(express.static('public'));

// Read the database file
const readDatabase = () => {
  if (!fs.existsSync('myDB.txt')) {//using text file as database
    fs.writeFileSync('myDB.txt', '');
  }
  return fs.readFileSync('myDB.txt', 'utf-8');
};

// Check if a user already exists
const userExists = (username) => {
  const db = readDatabase().split('\n');
  return db.some(user => user.split(',')[0] === username);
};

// Add new user to the database
const addUser = (username, password) => {
  fs.appendFileSync('myDB.txt', `${username},${password}\n`);
};

// http post method for register
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (userExists(username)) {
    res.send('Username already exists!');
  } else {
    addUser(username, password);
    res.send(`Registration successful for ${username}`);
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = readDatabase().split('\n');
  const userFound = db.some(user => {
    const [storedUser, storedPassword] = user.split(',');
    return storedUser === username && storedPassword === password;
  });

  if (userFound) {
    res.send(`Welcome, ${username}!`);
  } else {
    res.send('Invalid username or password.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
