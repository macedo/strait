module.exports.initialize = function(app) {
  app.post("/authorizations", function(request, response) {
    try {
      response.set("Content-Type", "application/json");

      var Auth   = require("./auth")
        , login  = request.param("login")
        , server = request.param("server")
        , authorization = Auth.createAuthorization(login, server);

      response.status(200).send(authorization);
    } catch(e) {
      response.status(400).send(e.message);
    }
  });

  app.get("/", function(request, response) {
    response.render("index", { queryString: JSON.stringify(request.query) });
  });
};
