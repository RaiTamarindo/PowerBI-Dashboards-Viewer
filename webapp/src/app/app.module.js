'use strict';

var angular = require('angular'),
    ngAria = require('angular-aria'),
    ngAnimate = require('angular-animate'),
    ngMaterial = require('angular-material'),
    Components = require('./components/components.module'),
    Services = require('./services/services.module');

const appModule = angular
    .module('app',
    [
        ngAria,
        ngAnimate,
        ngMaterial,
        Components,
        Services
    ]);

module.exports = appModule;