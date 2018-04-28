require('rootpath')();
var express = require('express');
var app = express();
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackConfig = require ('./webpack.config.js');
// var session = require('express-session');
var bodyParser = require('body-parser');
// var expressJwt = require('express-jwt');
// var config = require('./config/config.json')
var port = process.env.PORT || 3000;
app.use(webpackMiddleware(webpack(webpackConfig)));

//load all of the static files
app.set('view engine', 'jade');
app.use('/app', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/src'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(session({ secret: config.secret, resave: false, saveUninitialized: false }));
// // use JWT auth to secure the api
// app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));
// app.post('/login', require('./server/controllers/login.register.controller/login.controller'));
// // app.use('/register', require('./server/controllers/login.register.controller/register.controller'));
// // app.use('/app', require('./server/controllers/login.register.controller/app.controller'));
// app.use('/api/users', require('./server/controllers/api/user.controller'));
app.get('/todolist', require('./server/services/todoitem/todoList.service'));
app.post('/todoitem', require('./server/services/todoitem/todoList.service'));
app.put('/todoitem', require('./server/services/todoitem/todoList.service'));
app.delete('/todoitem', require('./server/services/todoitem/todoList.service'));
app.put('/completeditem', require('./server/services/todoitem/todoList.service'));
app.delete('/completeditem', require('./server/services/todoitem/todoList.service'));

app.get('/', function(req, res) {
    res.sendFile('/public/index.html');
});

// app.use(function(req, res) {
//     res.status(404).send('Page not found');
// });

app.listen(port);