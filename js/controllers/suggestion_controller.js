var SuggestionController = Ember.ObjectController.extend({

    upVoted: function(isDownVote) {

        var user = App.User.find(1);
        var suggestionsVoted = user.get('suggestionsVoted');
        var model = this.get('model');
        var upVotes = model.get('upVotes');
        var downVotes = model.get('downVotes');
        var valueToAdd = isDownVote ? downVotes : upVotes;
        var propToSet = isDownVote ? 'downVotes' : 'upVotes';

        suggestionsVoted.push(model.get('id'));
        model.set(propToSet, valueToAdd + 1);
        model.save();
        this.set('hasVoted', true);
    }
});

module.exports = SuggestionController;

