var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var produtosRouter = require('./routes/produtos');
var authRouter = require('./routes/auth');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/produtos', authRouter.validaUsuario);

app.use('/', indexRouter);
app.use('/produtos', produtosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/auth', authRouter.router);


module.exports = app;
