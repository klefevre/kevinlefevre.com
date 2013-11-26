/**
 *  main.js
 */

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
        },
        threejs: {
            exports: 'THREE'
        },
        tween: {
            exports: 'TWEEN'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        requirejs: '../bower_components/requirejs/require',
        'requirejs-text': '../bower_components/requirejs-text/text',
        modernizr: '../bower_components/modernizr/modernizr',
        threejs: '../bower_components/threejs/build/three',
        flexslider: '../bower_components/flexslider/jquery.flexslider',
        tween: '../bower_components/tweenjs/build/tween.min'
    }
});

require([
    'backbone',
    'routes/router',
    'MainScene'
], function (Backbone, Router, MainScene) {
    'use strict';

    manageLanguage();

//    var test = new MainScene();

    $("#stop-birds-btn").click(function(){
        console.log("console.log tapped");
        test.toggle();
        $("#stop-birds-btn").html(!test.isAnimated ? "Resume birds" : "Stop birds");
    });

    function manageLanguage() {
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
    }

});