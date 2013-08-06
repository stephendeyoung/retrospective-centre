
module.exports = function(grunt) {
    grunt.initConfig({
      qunit: {
        all: ['test/test.html']
      }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
};