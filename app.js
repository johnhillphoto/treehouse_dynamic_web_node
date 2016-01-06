var router = require("./router.js");
//Problem : We need a simple way to look at users badge count & javascript point in server
//Solution Use node.js to perform the profile look ups and serve our template via http

//1. create a web server

var http = require('http');
http.createServer(function (request, response) {
  router.home(request,response);
  router.user(request,response);
}).listen(3000);
console.log('Server running at http://workplace-url');

