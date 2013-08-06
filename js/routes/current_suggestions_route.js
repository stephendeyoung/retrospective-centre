var CurrentSuggestionsRoute = Ember.Route.extend({

    init: function() {
        this._super();
        App.User.find(1);
    },

    setupController: function(controller) {
        var groups = App.SuggestionGroup.find();

        groups.on('didLoad', function() {
            controller.listenToSuggestions();
        });

        controller.set('content', groups);
    }
});

module.exports = CurrentSuggestionsRoute;

