import Ember from 'ember';

var Router = Ember.Router.extend({
    location: 'auto'
});

Router.map(function () {
    this.route("index", {path: "/"});

    this.route("tracages", function () {
        this.route("see", {path: "see/:id"});
        this.route("edit", {path: "edit/:id"}, function () {
            this.route('bibliographies', function() {
                 this.route("edit", {path: "edit/:id"});
            });
        });
    });

    this.route("bibliographies", function () {
        this.route("see", {path: "see/:id"});
        this.route("edit", {path: "edit/:id"});
    });

    this.route("points", function () {
        // TODO : No points.new
        this.route("new");
        this.route("see", {path: "see/:id"});
        this.route("edit", {path: "edit/:id"});
    });

    this.route("accounts", function () {
        this.route("see", {path: "see/:id"});
        this.route("edit", {path: "edit/:id"});
    });

    this.route("organisms", function () {
        this.route("see", {path: "see/:id"});
        this.route("edit", {path: "edit/:id"});
    });

    this.route("lexicons", {path: "lexicons/:type"}, function () {
        this.route("edit", {path: "edit/:id"});
    });
});

export default Router;
