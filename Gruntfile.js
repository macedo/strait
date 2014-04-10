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
        src: ["client/requires/**/*.js"],
        dest: "build/vendor.js",
        options: {
          shim: {
            jquery: {
              path: "client/requires/jquery/javascripts/jquery.js",
              exports: "$"
            },
            stateMachine: {
              path: "client/requires/javascript-state-machine/javascripts/state-machine.js",
              exports: "StateMachine"
            },
            underscore: {
              path: "client/requires/underscore/javascripts/underscore.js",
              exports: "_"
            }
          }
        }
      },
      app: {
        files: {
          "build/application.js": ["client/src/main.js"]
        },
        options: {
          transform: ["hbsfy"],
          external: ["jquery", "underscore"]
        }
      },
      test: {
        files: {
          "build/tests.js": [
            "client/spec/**/*.test.js"
          ]
        },
        options: {
          transform: ["hbsfy"],
          external: ["jquery", "underscore"]
        }
      }
    },
    concat: {
      "build/<%= pkg.name %>.js": ["build/vendor.js", "build/application.js"]
    },
    copy: {
      dev: {
        files: [
          {
            src: "build/<%= pkg.name %>.js",
            dest: "public/javascripts/<%= pkg.name %>.js"
          }
        ]
      }
    },
    uglify: {
      compile: {
        options: {
          compress: true,
          verbose: true
        },
        files: [
          {
            src: "build/<%= pkg.name %>.js",
            dest: "dist/js/<%= pkg.name %>.js"
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
    },
    "mocha-chai-sinon": {
      build: {
        src: ["client/specs/*.test.js"],
        options: {
          ui: "bdd",
          reporter: "spec"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-mocha-chai-sinon");

  grunt.registerTask("init:dev", ["clean", "bower", "browserify:vendor"]);
  grunt.registerTask("build:dev", [
      "clean:dev", "browserify:app", "browserify:test",
      "jshint:dev", "concat", "copy:dev"]);
  grunt.registerTask("server", ["build:dev"]);
  grunt.registerTask("test", ["mocha-chai-sinon"]);
};
