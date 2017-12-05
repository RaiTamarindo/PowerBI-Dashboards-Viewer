'use strict';
require('./home.scss');

var template = require('./home.html'),
    controller = require('./home.controller');

const HomeComponent =
{
    template: template,
    controller: controller
};

module.exports = HomeComponent;