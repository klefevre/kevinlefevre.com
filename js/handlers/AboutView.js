/**
 * @author Kevin lefevre
 */

var AboutView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        var template = _.template(this.options.content, {});
        this.$el.html(template);
    }
//    events: {
//    },
});