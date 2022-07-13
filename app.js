require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todoRouter = require('./routes/todos');

const passport = require('passport');
require("./passport.js");

var app = express();

app.use(passport.initialize());

const mongoDB = "mongodb://localhost:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.log.bind(console, "MongoDB connection error"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/private', passport.authenticate('jwt', {session: false}), indexRouter);
app.use('/api/todos', passport.authenticate('jwt', {session: false}), todoRouter);
app.use('/api/user', usersRouter);

module.exports = app;

