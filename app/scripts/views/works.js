/**
 *  works.js
 */

define(function (require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        JST = require('templates'),
        THREE = require('threejs');

    return Backbone.View.extend({
        el: '#content-container',
        template: JST['app/scripts/templates/works.ejs'],
        events: { /* ... */ },

        initialize: function () {
        },
        render: function (data) {
            if (data != null) {
                this.$el.html( this.template( data ));

                require(["../WorksScene"], function (WorksScene) {
                   new WorksScene();
                });
            }
            return this;
        }
    });
});