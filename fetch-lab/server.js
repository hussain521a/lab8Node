"use strict";

let messages = [
  { id: 1, text: "Welcome to the message board!", author: "Admin" },
];
let nextId = 2;
 
const express = require('express');
const app = express();
 
// Serve static files from the 'public' folder
app.use(express.static('public'));
 
// Parse JSON request bodies (needed for POST)
app.use(express.json());
 
// ---- Your endpoints go below this line ----
 
 
 
// ---- Your endpoints go above this line ----
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/hello', (req, res) => {
  res.type('text').send('Hello from the server!');
});

app.get('/api/time', (req, res) => {
    const currentTime = new Date().toISOString();

    res.type('json').send({
        currentTime: currentTime,
        message: "Current server time"
    });
});

app.get('/api/greet/:name', (req, res) => {
    const name = req.params.name;
    res.type('json').send({
        greeting: `Hello, ${name}! Welcome to the API.`
    });
});

app.get('/api/math', (req, res) => {
    let { a, b, operation } = req.query;
    a = Number(a);
    b = Number(b);
    let result = 0;
    if (operation == 'add'){
        result = 0+a+b;
    }
    else if (operation == 'subtract'){
        result = 0+a-b;
    }
    else if (operation == 'multiply'){
        result = 0+a*b;
    }
    else if(operation == 'divide' && b == '0'){
        res.status(400).json({ error: 'Cannot divide by zero' });
    }
    else if (operation == 'divide'){
        result = 0+a/b;
    }
    else{
        res.status(400).json({ error: "Invalid or missing operation. Use: add, subtract, multiply, divide" });
    }

    res.type('json').send({
        a: `${a}`,
        b: `${b}`,
        operation: `${operation}`,
        result: `${result}`
    }); 
});



app.get('/api/slow', (req, res) => {
  setTimeout(() => {
    res.json({
      message: "Sorry for the wait!",
      delayMs: 3000
    });
  }, 3000);
});

app.get('/api/unreliable', (req, res) => {
  const rand = Math.random();
  if (rand < 0.5) {
    res.status(500).json({
      error: "Server had a bad day. Try again!"
    });
  } else {
    res.json({
      message: "Lucky! It worked this time.",
      luckyNumber: Math.floor(Math.random() * 100)
    });
  }
});

app.get('/api/messages', (req, res) => {
  const rand = Math.random();
  
    res.json(messages)
});

app.post('/api/messages', (req, res) => {
    const { text, author } = req.body;

    if (!text || !author) {
        return res.status(400).json({
        error: "text and author are required"
        });
    }

    const newMessage = {
        id: nextId++,
        text,
        author
    };

    messages.push(newMessage);

    res.status(201).json(messages);
});



