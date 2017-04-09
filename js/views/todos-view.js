/**
 * Created by Andrey Mikhailov on 09.04.2017.
 */

var app = app || {};

$(function () {

        app.TodoView = Backbone.View.extend({

        tagName: "li",

        template: _.template($('#item-template').html()),

        events: {
            "click .toggle": "toggleDone",
            "dblclick .view": "edit",
            "click button.close": "clear",
            "keypress .edit": "updateOnEnter",
            "blur .edit": "close"
        },

        initialize: function () {
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.remove);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass("done", this.model.get("done"));
            this.input = this.$(".edit");
            return this;
        },

        toggleDone: function () {
            this.model.toggle();
        },

        edit: function () {
            this.$el.addClass("editing");
            this.input.focus();
        },

        close: function () {
            var value = this.input.val();
            if (!value) {
                this.clear();
            } else {
                this.model.save({title: value});
                this.$el.removeClass("editing");
            }
        },

        updateOnEnter: function (e) {
            if (e.keyCode == 13) this.close();
        },

        clear: function () {
            this.model.destroy();
        }

    });
});
