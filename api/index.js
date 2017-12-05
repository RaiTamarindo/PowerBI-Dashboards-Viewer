'use strict';

var mongoose = require('mongoose'),
    config = require('./config/config'),
    app = require('./config/express'),
    Promise = require('bluebird'),
    server = app.listen(config.port, onAppStartup);

mongoose.Promise = Promise;

mongoose
    .connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database,
    {
        useMongoClient: true,
        server:
        {
            keepAlive: 1
        }
    });

mongoose.connection
    .on('error', function()
    {
        throw new Error('Erro ao conectar no banco de dados: ' + config.mongo.host);
    });

function onAppStartup()
{
    console.info('A aplicação está online na porta ' + config.port);
}

module.exports = app;