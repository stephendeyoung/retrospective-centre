var CurrentSuggestionsView = Ember.View.extend({

    didInsertElement: function() {
        var self = this;

        self.get('controller').on('suggestionsLoaded', function() {
            self.rerender();
        });
    }
});

module.exports = CurrentSuggestionsView;

