'use strict';

var injectParams = [];

const HomeController = function()
{
    var vm = this;

    // Data

    // Methods
    vm.$onInit = onInit;
    vm.$onDestroy = onDestroy;

    ///////////
    function onInit()
    {

    }

    function onDestroy()
    {

    }

};

HomeController.$inject = injectParams;

module.exports = HomeController;