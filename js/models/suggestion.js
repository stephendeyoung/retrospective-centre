var Suggestion = Ember.Model.extend({
    id: Ember.attr(),
    title: Ember.attr(),
    description: Ember.attr(),
    upVotes: Ember.attr(),
    downVotes: Ember.attr(),
    group: Ember.belongsTo('App.SuggestionGroup', {
        key: 'group_id'
    })
});

Suggestion.url = "/server/suggestions";
Suggestion.camelizeKeys = true;
Suggestion.collectionKey = 'suggestions';

Suggestion.adapter = Ember.RESTAdapter.create();

module.exports = Suggestion;

