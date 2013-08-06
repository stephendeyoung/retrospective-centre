
var loginForm,
    usernameField,
    passwordField,
    submitButton,
    loginError,
    checkLoginError = function(promise) {
        promise.click(submitButton)
            .then(function() {
                ok(exists(loginError), 'an error message exists');
            });
    };

module('Login page', {
    setup: function() {
        loginForm = '.login';
        usernameField = loginForm + ' input[type="text"]';
        passwordField = loginForm + ' input[type="password"]';
        submitButton = loginForm + ' input[type="submit"]';
        loginError = '.invalid-login';

        App.ApplicationController = Ember.Controller.extend({
            updateCurrentPath: function() {
                App.set('currentPath', this.get('currentPath'));
            }.observes('currentPath')
        });
        Ember.run(App, App.advanceReadiness);

    },

    teardown: function() {
        loginForm = null;
        usernameField = null;
        passwordField = null;
        submitButton = null;
        loginError = null;
        App.reset();
    }
});

test('the template is rendered correctly', function() {
    expect(3);
    visit('/').then(function() {

        ok(exists(usernameField), 'username field exists');
        ok(exists(passwordField), 'password field exists');
        ok(!exists(loginError), 'no error message exists');
    });
});

test('entering no username or password will result in an error message being shown', function() {
    expect(1);
    checkLoginError(visit('/'));
});

test('entering a username without a password will result in an error message being shown', function() {
    expect(1);
    checkLoginError(
        visit('/').fillIn(usernameField, 'unknown')
    );
});

test('entering a password without a username will result in an error message being shown', function() {
    expect(1);
    checkLoginError(
        visit('/').fillIn(passwordField, 'unknown')
    );
});

test('entering an incorrect username and password will result in an error message being shown', function() {
    expect(1);
    checkLoginError(
        visit('/')
            .fillIn(usernameField, 'unknown')
            .fillIn(passwordField, '   jqgjbnp')
    );
});

test('entering a correct username and password will transition the user to a new route', function() {
    expect(2);
    visit('/').fillIn(usernameField, 'syoung')
        .fillIn(passwordField, 'password')
        .click(submitButton)
        .then(function() {
            ok(!exists(loginError), 'no error message exists');
            deepEqual(App.get('currentPath'), 'current-suggestions', 'the user is on the "current-suggestions" route');
    });
});