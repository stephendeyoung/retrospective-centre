
var SuggestionGroup = Ember.Model.extend({
    id: Ember.attr(),
    name: Ember.attr(),
    suggestions: Ember.hasMany('App.Suggestion', {
        key: 'suggestion_ids'
    })
});

SuggestionGroup.url = "/server/suggestion_group";
SuggestionGroup.camelizeKeys = true;
SuggestionGroup.collectionKey = 'suggestion_group';

SuggestionGroup.adapter = Ember.RESTAdapter.create();

module.exports = SuggestionGroup;

