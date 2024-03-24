// Create web server
// Create a web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 3000;

// Use the public directory to serve static files
app.use(express.static('public'));

// Use the views directory to serve HTML files
app.set('views', path.join(__dirname, 'views'));

// Use the EJS view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Comments', heading: 'Comments' });
});

app.get('/comments', (req, res) => {
  fs.readFile('./data/comments.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An unexpected error occurred');
      return;
    }
    const comments = JSON.parse(data);
    res.render('comments', { title: 'Comments', heading: 'Comments', comments });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
