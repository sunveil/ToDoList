/**
 * Created by Andrey Mikhailov on 09.04.2017.
 */

var app = app || {};

(function() {
        
        app.Todo = Backbone.Model.extend({

            defaults: function () {
                return {
                    title: "",
                    done: false
                };
            },

            initialize: function () {
                if (!this.get("title")) {
                    this.set({"title": this.defaults().title});
                }
            },

            toggle: function () {
                this.save({done: !this.get("done")});
            }

        });
    }
)();
