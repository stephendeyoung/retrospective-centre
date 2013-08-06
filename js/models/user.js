var User = Ember.Model.extend({
    id: Ember.attr(),
    suggestionsVoted: Ember.attr()
});

User.adapter = Ember.FixtureAdapter.create();

User.FIXTURES = [
    {
        id: 1,
        suggestionsVoted: [1]
    }
];

module.exports = User;

