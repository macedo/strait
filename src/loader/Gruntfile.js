module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      dist: {
        src: ["build/templates.html.js", "build/templates.css.js", "build/main-built.js"],
        dest: "dist/loader.js"
      },
    },
    uglify: {
      dist: {
        src: "<%= concat.dist.dest %>",
        dest: "dist/loader.min.js"
      }
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      all: ["Gruntfile.js", "src/js/**/*.js"]
    },
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: "Gruntfile.js",
        tasks: ["jshint:gruntfile"]
      },
      sources: {
        files: ["src/**/*.js"],
        tasks: ["compile"]
      }
    },
    availabletasks: {
      tasks: {}
    },
    connect: {
      server: {
        options: {
          base: "dist/",
          livereload: true,
          hostname: "*"
        }
      }
    },
    bower : {
      install: {
        options: {
          targetDir: "bower_components" }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "src/js",
          mainConfigFile: "src/js/main.js",
          include: ["../../bower_components/requirejs/require.js", ],
          name: "main",
          out: "build/main-built.js",
          optimize: "none",
          shim: {
            underscore: { exports: "_" },
            backbone: { deps: ["underscore"], exports: "Backbone" }
          },
          paths: {
            underscore: "../../bower_components/underscore/underscore",
            backbone: "../../bower_components/backbone/backbone",
            jquery: "../../bower_components/jquery/jquery"
          }
        }
      }
    },
    casperjs: {
      options: {
        async: {
          parallel: false
        }
      },
      files: ["test/acceptance/**/*.js"]
    },
  });

  grunt.registerTask("init:dev", ["bower"]);
  grunt.registerTask("server",   ["connect", "watch"]);
  grunt.registerTask("tasks",    ["availabletasks"]);
};
