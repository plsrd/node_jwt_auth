const express = require('express');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  //Get auth header value
  const bearerHeader = req.headers['authorization'];
  //Check if bearer is undefined
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[1];

    req.token = bearerToken;

    next();
  } else {
    res.sendStatus(403);
  }
};

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData,
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  //Mock user
  const user = {
    id: 1,
    username: 'rd',
    email: 'rd@gmail.com',
  };
  jwt.sign({ user }, 'secretKey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token,
    });
  });
});

//FORMAT OF TOKEN
//Authorization: Bearer <acces_token>

//Verify Token

app.listen(3000, () => console.log('server running on port 3000'));
