var AddSuggestionView = Ember.View.extend({
    templateName: 'add-suggestion',

    modalClass: '.md-modal',

    modalShowClass: 'md-show',

    waitForTransition: false,

    didInsertElement: function() {
        var self = this;
        setTimeout(function() {
            self
                .$()
                .find(self.modalClass)
                .addClass(self.modalShowClass);
        }, 1);

        this.get('controller').on('remove', this.removeModal.bind(this));
    },

    removeModal: function() {
        this.set('waitForTransition', true);
        this
            .$()
            .find(this.modalClass)
            .removeClass(this.modalShowClass);
    },

    transitionEnd: function() {
        if (this.get('waitForTransition')) {
            var controller = this.get('controller');
            controller.send('dismissModal');
            controller.off('remove');
            this.set('waitForTransition', false);
        }
    }
});

module.exports = AddSuggestionView;

