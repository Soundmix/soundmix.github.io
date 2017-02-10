"use strict";

var Config = require('./config.js');
var server = require("webserver").create();
var port = Config.port;
var capture = require("./capture");

server.listen(port, function(request, response) {
  console.log(Date.now() + " Requested URL (" + response.statusCode + "): " + request.url);
  
  var url, split_url = request.url.split("?_escaped_fragment_=");
  var search = split_url[1];
  if (search) {
    url = decodeURIComponent(split_url[0]) + "#!" + search;
    url = Config.internalServicePath + url;
    
    capture(url, function(statusCode, contentType, content) {
      if (response) {
        response.statusCode = statusCode;
        response.setHeader("Content-Type", contentType);
        response.write(content);
        response.close();
      }
    });
  } else {
    response.statusCode = 404;
    response.close();
  }
});