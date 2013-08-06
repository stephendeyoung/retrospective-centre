var SuggestionRoute = Ember.Route.extend({

    setupController: function(controller, suggestion) {
        var user = App.User.find(1);
        var id = suggestion.get('id');
        var hasUserVoted = user.get('suggestionsVoted').some(function(suggestionId) {
            return suggestionId === id;
        });

        controller.set('model', suggestion);
        controller.set('hasVoted', hasUserVoted);
    },

    serialize: function(model) {
        var id = model.get('id');
        var title = model.get('title');

        if (title) {

            return {
                suggestion_title: title.replace(/\s/g, '-').toLowerCase(),
                suggestion_id: id
            };
        }
    }
});

module.exports = SuggestionRoute;

