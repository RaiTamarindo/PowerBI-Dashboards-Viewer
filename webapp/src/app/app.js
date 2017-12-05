'use strict';

require('../scss/app.style.scss');

var AppModule = require('./app.module'),
    AppConfig = require('./app.config'),
    HomeComponent = require('./main/home/home.component');

AppModule
    .config(AppConfig)
    .component('home', HomeComponent);