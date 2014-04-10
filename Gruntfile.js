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
    watch: {
      scripts: {
        files: ["client/templates/*.hbs", "client/src/**/*.js"],
        tasks: ["clean:dev", "browserify:app", "concat", "copy:dev"]
      }
      test: {
        files: ["build/application.js", "client/spec/**/*.test.js"],
        tasks: ["browserify:test"]
      },
      karma: {
        files: ["build/tests.js"],
        tasks: ["jshint:test", "karma:watcher:run"]
      }
    },
    nodemon: {
      dev: {
        options: {
          file: "strait_web.js",
          nodeArgs: ["--debug"],
          watchedFolders: ["controllers", "app"],
          env: {
            PORT: "3300"
          }
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ["nodemon:dev", "watch:scripts", "watch:test"],
        options: {
          logConcurrentOutput: true
        }
      },
      test: {
        tasks: ["watch:karma"],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    karma: {
      options: {
        configFile: "karma.conf.js"
      },
      watcher: {
        background: true,
        singleRun: false
      },
      test: {
        singleRun: true
      }
    },
    jshint: {
      all: ["Gruntfile.js", "client/src/**/*.js", "client/spec/**/*.js"],
      dev: ["client/src/**/*.js"],
      test: ["client/spec/**/*.js"]
    }
  });

  grunt.registerTask("init:dev", ["clean", "bower", "browserify:vendor"]);
  grunt.registerTask("build:dev", [
      "clean:dev", "browserify:app", "browserify:test",
      "jshint:dev", "concat", "copy:dev"]);
  grunt.registerTask("server", ["build:dev", "concurrent:dev"]);
  grunt.registerTask("test", ["karma:test"]);
};
