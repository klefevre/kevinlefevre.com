define(function (require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        JST = require('templates');

    return Backbone.View.extend({
        el: '#kl-menu',
        template: JST['app/scripts/templates/menu.ejs'],
        events: { /* ... */ },

        initialize: function () {

        },
        render: function (data) {
            if (data != null) {
                this.$el.html( this.template( data ));
            }
            return this;
        }
    });
});
