module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      react: {
        files: 'src/*.jsx',
        tasks: ['browserify']
      },
      ocean: {
        files: ['src/*.js', 'test/*-test.js'],
        tasks: ['test']
      }
    },

    jasmine: {
      src: 'src/**/*.js',
      options: {
        vendor: 'vendor/**/*.js',
        specs: 'test/**/*-test.js'
      }
    },

    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ]
      },
      client: {
        src: ['src/**/*.jsx'],
        dest: 'build/app.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', [
    'browserify'
  ]);
  grunt.registerTask('test', [
    'jasmine'
  ]);
};
