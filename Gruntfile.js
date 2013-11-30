/* jshint node: true */

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      main: ['tmp/']
    },
    transpile: {
      main: {
        type: 'amd',
        moduleName: function(path) {
          return grunt.config.process('sound-and-vision/') + path;
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: '**/*.js',
          dest: 'tmp/transpiled/'
        }]
      }
    },
    traceur: {
      options: {
        sourceMaps: true,
      },
      main: {
        files: [{
          expand: true,
          cwd: 'tmp/transpiled/',
          src: '**/*.js',
          dest: 'tmp/traceured/'
        }]
      }
    },
    concat_sourcemap: {
      main: {
        src: 'tmp/traceured/**/*.js',
        dest: 'tmp/game.js',
        options: {
          sourceRoot: ".."
        }
      }
    },
    watch: {
      main: {
        files: ["src/**/*.js"],
        tasks: ["default"]
      }
    },
    connect: {
      server: {
        options: {
          port: process.env.PORT || 8000,
          hostname: '0.0.0.0',
          base: '.'
        }
      }
    }
  });

  grunt.registerTask("default", ["clean", "transpile", "traceur", "concat_sourcemap"]);
  grunt.registerTask("dev", ["default", "connect", "watch"]);
};
