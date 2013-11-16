/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        requirejs: '../bower_components/requirejs/require',
        'requirejs-text': '../bower_components/requirejs-text/text',
        modernizr: '../bower_components/modernizr/modernizr',
        threejs: '../bower_components/threejs/build/threejs',
        flexslider: '../bower_components/flexslider/jquery.flexslider'
    }
});

require([
    'backbone',
    'routes/router'
], function (Backbone, Router) {
    'use strict';

    Backbone.application = {
        language: 'en', // Default language.
        supportedLanguage: ['en', 'fr']
    };

    // Detect navigator language.
    var curLang;
    if (navigator.language) {
        curLang = navigator.language;
    } else if (navigator.userLanguage) {
        curLang = navigator.userLanguage;
    } else {
        curLang = '';
    }

    // If current language is supported, then define it.
    console.log('curLang =', curLang, ' -> tested substring =', curLang.substring(0, 2));
    curLang = curLang.substring(0, 2); // Transform "en-US" in "en" for example
    if($.inArray(curLang, Backbone.application.supportedLanguage) !== -1) {
        Backbone.application.language = curLang;
    }

    var router = new Router();
});