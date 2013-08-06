var IndexController = Ember.Controller.extend({
    handleSubmit: function() {
        var username = this.get('username');
        var password = this.get('password');

        if (username === 'syoung' && password === 'password') {
            this.get('target').transitionTo('current-suggestions');
        } else {
            this.set('invalidLogin', true);
        }
    }
});

module.exports = IndexController;

