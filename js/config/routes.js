var App = require('./app');

App.Router.map(function() {
    this.resource('current-suggestions');
    this.resource('suggestion', {
        path: '/current-suggestions/:suggestion_title/:suggestion_id'
    });
});

