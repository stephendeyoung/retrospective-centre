var AddSuggestionController = Ember.Controller.extend(Ember.Evented, {

    suggestionGroups: function() {
        return App.SuggestionGroup.find();
    }.property(),

    removeModal: function() {
        this.trigger('remove');
    },

    createSuggestion: function() {
        var group = this.get('group');
        var title = this.get('title');
        var description = this.get('description');
        var suggestions = App.Suggestion.find();
        var newId = suggestions.reduce(function(a, b, i) {
            return i + 1;
        }) + 1;

        var newSuggestion = App.Suggestion.create({
            id: newId,
            title: title,
            description: description,
            upVotes: 0,
            downVotes: 0,
            group_id: group
        });

        var suggestionGroup = App.SuggestionGroup.find(group);

        //console.log(suggestionGroup.get('suggestions'))
        suggestionGroup.get('suggestions').pushObject(newSuggestion);
        newSuggestion.save();
        //newSuggestion.load();

        this.removeModal();
        //this.get('target').transitionTo('/current-suggestions/' + newSuggestion.get('id'));
    }
});

module.exports = AddSuggestionController;

