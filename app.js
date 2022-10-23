const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = "mongodb+srv://netninja:test1234@nodetuts.1qiep.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result=>app.listen(3000),console.log('DB connected'))
    .catch(err=> console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/websocks_basic' , requireAuth, (req, res) => res.sendFile('websocket_basic.html' , { root: '.' }));
app.use(authRoutes);

