module.exports = function(grunt) {

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
    requirejs: {
      loader: {
        options: {
          baseUrl: __dirname,
          out: "build/loader.js",
          paths: {
            jquery: "client/requires/jquery/javascripts/jquery"
          }
        }
      }
    }
  });

  grunt.registerTask("init:dev", ["bower"]);
};
