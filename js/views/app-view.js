/**
 * Created by Andrey Mikhailov on 09.04.2017.
 */

var app = app || {};

$(function () {

    app.AppView = Backbone.View.extend({

        el: $("#todoapp"),

        ul: $("#todo-list"),

        statsTemplate: _.template($('#stats-template').html()),

        events: {
            "keypress #new-todo": "createOnEnter",
            "click #clear-completed": "clearCompleted",
            "click #toggle-all": "toggleAllComplete",
            "click #add-todo": "createOnClick"
        },

        initialize: function () {

            this.input = this.$("#new-todo");
            this.allCheckbox = this.$("#toggle-all")[0];

            this.listenTo(app.todoList, "add", this.addOne);
            this.listenTo(app.todoList, "reset", this.addAll);
            this.listenTo(app.todoList, "all", this.render);

            this.footer = this.$("footer");
            this.main = $('#main');

            app.todoList.fetch();

        },

        render: function () {
            var done = app.todoList.done().length;
            var remaining = app.todoList.remaining().length;
            if (app.todoList.length) {
                this.main.show();
                this.footer.show();
                this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
            } else {
                this.main.hide();
                this.footer.hide();
            }

            this.allCheckbox.checked = !remaining;
        },

        addOne: function (todo) {
            var items = [];
            app.todoList.each(function(item) {
                items.push($((new app.TodoView({model: item})).render().el).addClass("list-group-item"));
            });
            this.ul.html(items);
        },

        addAll: function () {
            app.todoList.each(this.addOne, this);
        },

        createOnEnter: function (e) {
            if (e.keyCode != 13) return;
            if (!this.input.val()) return;

            app.todoList.create({title: this.input.val()});
            this.input.val('');
        },

        createOnClick: function() {
            app.todoList.create({title: this.input.val()});
            this.input.val('');
        },

        clearCompleted: function () {
            _.invoke(app.todoList.done(), "destroy");
            return false;
        },

        toggleAllComplete: function () {
            var done = this.allCheckbox.checked;
            app.todoList.each(function (todo) {
                todo.save({"done": done});
            });
        }

    });
});