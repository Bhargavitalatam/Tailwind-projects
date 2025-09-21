const express = require('express');
const app = express();
const port = 3000;

// Built-in middleware to parse JSON
app.use(express.json());

// Custom middleware to log request method and URL
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); // Pass control to the next middleware
});

// Route-specific middleware
const checkHeader = (req, res, next) => {
    if (req.headers['x-custom-header']) {
        console.log('Custom header found');
        next();
    } else {
        res.status(400).send('Missing custom header');
    }
};

// Route using middleware
app.get('/secure-data', checkHeader, (req, res) => {
    res.send('Secure data accessed.');
});

// Basic route
app.get('/', (req, res) => {
    res.send('Home Page');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
