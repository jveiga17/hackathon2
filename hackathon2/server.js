// imports
// importing express.js framework
const express = require('express');   

// middleware setup (reqs and session)
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');     // sessions: store user-specific information across multiple pages during a user's visit to a website - server recognises user

// routes and path
const authRoutes = require('./source/routes/authRoutes');  
const path = require('path');

// instance and port def
const app = express();
const port = 3000;


// Middleware config
app.use(bodyParser.urlencoded({
    extended: true
}));

// parsing
app.use(bodyParser.json());
app.use(cookieParser());

// session 
app.use(session({
    secret: 'secret-key123',     // used to sign and encrypt (hash) session data stored in cookies
    resave: true,                // ensures session is saved - prevents unintentional data loss
    saveUninitialized: true      // ensures even new sessions are saved
}));


// serving static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public/html')));

// serving static files from the "scripts" directory
// app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')));

app.use(express.static(path.join(__dirname, 'public/html')));
app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// authentication routes
app.use('/auth', authRoutes);

// route for the root path ("/")
app.get('/', (req, res) => {     // *****
    res.send('Welcome to the Relaxation Playlist Generator!');
});


// starting the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
