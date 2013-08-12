Running the app
====================

You will need to have [ember tools](https://github.com/rpflorence/ember-tools) installed to run the app.

1. After you've cloned the repo go into the root of the directory and run `ember create`
2. When ember tools asks if you want to overwrite a file always type `n`
3. Run `ember build`
4. Run `node server/index.js`
5. Visit [http://localhost:1234/](http://localhost:1234/) in your browser
6. To login the username is `syoung` and the password is `password`

## Running the tests

You will need to have grunt and the node dependencies installed. Then run `grunt qunit` to execute the tests.
