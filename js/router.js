/**
 * @author Kevin lefevre
 */

var Router = Backbone.Router.extend({
    language: null,
    routes: {
        "" :       "index",
        "index" :  "index",
        ":query":   "process"
    },

    initialize: function(options){
    },

    // Empty route
    index : function() {
        this.process('home');
    },

    // Generic method to render view
    process : function(query) {
        var objectName = query.charAt(0).toUpperCase() + query.slice(1) + 'View'; // eg. about -> AboutView
        var templatePath = 'views/' + query + '.html';
        var handlerPath = 'js/handlers/' + objectName + '.js';

        console.log("- Router ----------------");
        console.log("query =", query);
        console.log("template =", templatePath);
        console.log("handler =", handlerPath);

//        console.log($.url());

        // Download the html view
        $.get(templatePath, function(html, textStatus, jqXHR) {
            if (jqXHR.status == 200) {
                // Download the javascript handler
                $.getScript(handlerPath, function() {
                    new window[objectName]({content: html, el: $('#content')});
                });
            }
        });

        console.log("--------");
    }
});
