module.exports.initialize = function(app) {
  app.post("/authorizations", function(request, response) {
    response.writeHead(200, { "Content-Type": "application/json" });

    var Auth   = require("./auth")
      , login  = request.param("login")
      , server = request.param("server");

    response.write(Auth.generateSignature(login, server));
    response.end();
  });


  app.get("/", function(request, response) {
    response.render("index");
  });

};
