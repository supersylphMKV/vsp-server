/**
 * Created by supersylph on 10/07/21.
 */
const express = require('express');
const pug = require('pug');
const http = require('http');
const path = require('path');
const app = express();

var frontend, socket, mp;

app.set('port', 8223);

const server = app.listen(app.get('port'), function(){

    frontend = require('./server_modules/frontpage')();
    socket = require('./server_modules/socket_service')(server);
    mp = require('./server_modules/players_service')(socket, {
        fps : 20
    });

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/modules', express.static(path.join(__dirname, 'node_modules')));
    app.use('/sim', express.static(path.join(__dirname, 'sim')));

    app.use('/', frontend);

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }


    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    console.log('server ready');
});