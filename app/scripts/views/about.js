define(function (require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        JST = require('templates');

    return Backbone.View.extend({
        el: '#content-container',
        template: JST['app/scripts/templates/about.ejs'],
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