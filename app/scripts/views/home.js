/**
 *  home.js
 */

define(function (require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        flexslider = require('flexslider'),
        JST = require('templates');

    return Backbone.View.extend({
        el: '#content-container',
        template: JST['app/scripts/templates/home.ejs'],
        events: { /* ... */ },

        initialize: function () {
        },
        render: function (data) {
            if (data != null) {
                this.$el.html( this.template( data ));
            }
            this.handle();
            return this;
        },
        handle: function () {
            $('.flexslider').flexslider({
                animation: "slide"
            });

        }
    });
});