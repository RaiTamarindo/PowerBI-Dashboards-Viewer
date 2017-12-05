'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    validator = require('express-validator'),
    validation = require('express-validation'),
    path = require('path'),
    appRoot = require('app-root-path'),
    httpStatus = require('http-status'),
    validators = require('../helpers/validators'),
    routes = require('../routes/index.route.js'),
    config = require('./config'),
    ApiError = require('../helpers/api.error');

const app = express();

// Static files
app.use(express.static(path.join(appRoot.path, 'public')));

// API Services
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator({customValidators:validators}));
app.use('/api', routes);

// Convert any errors in ApiError
app.use(function(err, req, res, next)
{
    if (err instanceof validation.ValidationError)
    {
        const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
        const error = new ApiError(unifiedErrorMessage, err.status, true);
        return next(error);
    }
    else if (!(err instanceof ApiError))
    {
        if(err.status)
        {
            if(httpStatus[err.status] === undefined)
            {
                err.status = httpStatus.INTERNAL_SERVER_ERROR;
            }
        }
        else
        {
            err.status = httpStatus.INTERNAL_SERVER_ERROR;
        }
        const error = new ApiError(err.message, err.status, err.isPublic);
        return next(error);
    }
    return next(err);
});

// Catch service not found
app.use(function(req, res, next)
{
    const error = new ApiError('API not found', httpStatus.NOT_FOUND);
    return next(error);
});

// Handle ApiErrors
app.use(function(err, req, res, next)
{
    res.status(err.status)
        .json(
        {
            message: err.isPublic ? err.message : httpStatus[err.status],
            // stack: config.env === 'development' ? err.stack : {}
        })
});

module.exports = app;