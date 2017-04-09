/**
 * Created by Andrey Mikhailov on 09.04.2017.
 */

var app = app || {};

(function() {

    var TodoList = Backbone.Collection.extend({

        model: app.Todo,
        sortKey: "title",

        localStorage: new Backbone.LocalStorage("todos-backbone"),

        done: function () {
            return this.filter(function (todo) {
                return todo.get("done");
            });
        },

        remaining: function () {
            return this.without.apply(this, this.done());
        },

        comparator: function (a, b) {
            return - a.get(this.sortKey).localeCompare(b.get(this.sortKey));
        }

    });

    app.todoList = new TodoList();

})();