var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var queryString = require("querystring");

var commonHeaders = {'Content-Type': 'text/html'};

// Handle HTTP route GET and POST i.e. home
    function home(request, response){
  //if URL = "/" && GEt
  if(request.url === "/"){
    if(request.method.toLowerCase() === "get"){
      //show search field
      response.writeHead(200, commonHeaders);
      renderer.view("header", {}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    } else {
        // if URL = "/" && POST

        //get the post data from 
        request.on("data", function(postBody) {
          //extract the username
          var query = queryString.parse(postBody.toString());
          //redirect to /:username
          response.writeHead(303, {"Location": "/" + query.username});
          response.end();
        });
        
    }
  // if URL = "/" && POST
    //redirect to /:username
  }
}

//Handle HTTP route Get / username i.e. chalkers
  function user(request, response) {
      //if url =="/..."
      var username = request.url.replace("/" , "");
      if(username.length > 0) {
        response.writeHead(200, commonHeaders);
        renderer.view("header", {}, response);

        //get JSON from Treehouse
        var studentProfile = new Profile(username);
        // on "end"
        studentProfile.on("end", function(profileJSON){
              //show profile

              //Store the values which we need
              var values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
              }
              //Simple Response
              renderer.view("profile", values, response);
              renderer.view("footer", {}, response);
              response.end();
            });

        //on error
        studentProfile.on("error", function(error){
            //show error
            renderer.view("error", {errorMessage: error.message}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        });
        
             
      } //end if
  } //end userRoute


  module.exports.home = home;
  module.exports.user = user;