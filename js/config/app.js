// require other, dependencies here, ie:
// require('./vendor/moment');

require('../vendor/jquery');
require('../vendor/handlebars');
require('../vendor/ember');
require('../vendor/ember-model');

var App = Ember.Application.create({
    rootElement: '#ember-app',
    customEvents: {
        'transitionend': 'transitionEnd'
    }
});

module.exports = App;

