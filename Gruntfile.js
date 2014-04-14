module.exports = function(grunt) {
  require("time-grunt")(grunt);
  require("load-grunt-tasks")(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    bower: {
      install: {
        options: {
          targetDir: "client/requires",
          layout: "byComponent"
        }
      }
    },
    clean: {
      build: ["build"],
      dev: {
        src: ["build/application.js", "build/<%= pkg.name %>.js"]
      }
    },
    browserify: {
      vendor: {
        src: ["client/requires/**/javascripts/*.js"],
        dest: "build/vendor.js",
        options: {
          shim: {
            jquery: {
              path: "client/requires/jquery/javascripts/jquery.js",
              exports: "$"
            },
            underscore: {
              path: "client/requires/underscore/javascripts/underscore.js",
              exports: "_"
            },
            backbone: {
              path: "client/requires/backbone/javascripts/backbone.js",
              exports: "Backbone",
              depends: {
                jquery: "jquery",
                underscore: "underscore"
              }
            },
            string: {
              path: "client/requires/string/javascripts/string.js",
              exports: "String"
            }
          }
        }
      },
      app: {
        files: {
          "build/application.js": ["client/src/app.js"]
        },
        options: {
          transform: ["hbsfy"],
          external: ["jquery", "underscore", "backbone", "string"]
        }
      },
      embed: {
        files: {
          "build/application_embed.js": ["client/src/embed.js"]
        },
        options: {
          transform: ["hbsfy"],
          external: ["jquery", "underscore", "backbone", "string"]
        }
      }
    },
    concat: {
      "build/<%= pkg.name %>.js": ["build/vendor.js", "build/application.js"],
      "build/<%= pkg.name %>.embed.js": ["build/vendor.js", "build/application_embed.js"]
    },
    copy: {
      dev: {
        files: [
          {
            src: "build/<%= pkg.name %>.js",
            dest: "public/javascripts/<%= pkg.name %>.js"
          },
          {
            src: "build/<%= pkg.name %>.embed.js",
            dest: "public/javascripts/<%= pkg.name %>.embed.js"
          }
        ]
      }
    },
    jshint: {
      all: ["Gruntfile.js", "client/src/**/*.js", "client/spec/**/*.js"],
      dev: ["client/src/**/*.js"],
      test: ["client/spec/**/*.js"],
      options: {
        laxcomma: true
      }
    }
  });

  grunt.registerTask("init:dev", ["clean", "bower", "browserify:vendor"]);
  grunt.registerTask("build:dev", [
      "clean:dev", "browserify:app", "browserify:embed", "jshint:dev", "concat", "copy:dev"]);
  grunt.registerTask("server", ["build:dev"]);
};
