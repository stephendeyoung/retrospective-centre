var ApplicationRoute = Ember.Route.extend({
    events: {
        createSuggestion: function() {
            this.render('add-suggestion', {
                into: 'application',
                outlet: 'modal'
            });
        },

        dismissModal: function() {
            var parentView = this.router._lookupActiveView('application');

            parentView.disconnectOutlet('modal');
        }
    }
});

module.exports = ApplicationRoute;

