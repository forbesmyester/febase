"use strict";

var express = require('express'),
    app = express(),
    webpackDevMiddlware = require('webpack-dev-middleware'),
    webpack = require('webpack'),
    R = require('require-parts')('ramda', 'src', ['forEach']),
    errorhandler = require('errorhandler'),
    fs = require('fs');

var browserified = ['/jsx/index.jsx'];
var fixedFiles = [
    {path: '/', file: '/index.html'},
    {path: '/user/:userId', file: '/index.html'},
    {path: '/user/:userId/groups', file: '/index.html'},
    {path: '/user/:userId/group/:gid', file: '/index.html'},
    {path: '/user/:userId/groups', file: '/index.html'},
    {path: '/node_modules/normalize.css/normalize.css', file: '/node_modules/normalize.css/normalize.css'}
];

var webpackCompiler = webpack(require('./webpack.config.js'));

// if ('development' == app.get('env')) {
//     console.log("DEVELOPMENT MODE");
//     app.use(errorhandler());

//     R.forEach(function(path) {
        app.use(
            // path,
            webpackDevMiddlware(webpackCompiler)
        );
    // }, browserified);
// }

R.forEach(function(fixedFile) {
    app.get(fixedFile.path, function(req, res) {
        res.sendFile(__dirname + fixedFile.file);
    });
}, fixedFiles);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

