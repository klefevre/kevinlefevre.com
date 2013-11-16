define(function (require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone');

    var viewArray = ['menu', 'home', 'about', 'works', 'contact'],
        currentView = null;

    return Backbone.Router.extend({
        routes: {
            "" :       "index",
            "index" :  "index",
            ":query":   "process"
        },

        initialize: function(options) {
            Backbone.history.start( {pushState: false} );
            this.process('menu');
        },

        // Empty route
        index : function() {
            this.process('home');
        },

        // Generic method to render view
        process : function(query) {
            console.log("- Router ----------------");
            console.log("query =", query);

            // If view exist, then render it
            if ($.inArray(query, viewArray) !== -1) {
                console.log('--> processing...');

                // Require view
                require(['views/' + query], function (View) {

                    // Get data according to current language
                    $.getJSON( 'mocks/' + Backbone.application.language +'/'+query+'.json', function (data) {

                        // Instanciate new view with data
                        currentView = new View();
                        currentView.render(data);
                    });
                });
            } else {
                console.log('not recognized');
            }
        },
        updateLanguage: function(lang) {
            // TODO: Set langage to current view
        }
    });
});