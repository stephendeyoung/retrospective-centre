
var EventedController = Ember.ArrayController.extend(Ember.Evented);

var CurrentSuggestionsController = EventedController.extend({

    listenToSuggestions: function() {
        var self = this;
        var suggestions = App.Suggestion.find();
        suggestions.on('didLoad', function() {
            self.trigger('suggestionsLoaded');
        });
    }
});

module.exports = CurrentSuggestionsController;

