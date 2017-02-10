"use strict";

var Monitor = require("./monitor");
var Config = require("./config.js");

function getPageContent() {
  var docType, docTypeString = "";
  docType = document.doctype;
  if (docType) {
    docTypeString = "<!DOCTYPE " + docType.nodeName;
    if (docType.publicId) {
      docTypeString += " PUBLIC \"" + docType.publicId + "\"";
      if (docType.systemId)
        docTypeString += " \"" + docType.systemId + "\"";
    }
    else if (docType.systemId)
      docTypeString += " SYSTEM \"" + docType.systemId + "\"";
    if (docType.internalSubset)
      docTypeString += " [" + docType.internalSubset + "]";
  }
  return docTypeString + ">\n" + document.documentElement.outerHTML;
}

function getContentType(headers) {
  var contentType = headers.filter(function(header) {
    return header.name.toLowerCase() == "content-type";
  });
  
  if (contentType && contentType[0]) {
    return contentType[0].value;
  }
}

function isForbiddenContent (resourceUrl) {
  for (var i = 0; i < Config.forbiddenResources.length; i += 1) {
    if (resourceUrl.indexOf(Config.forbiddenResources[i]) >= 0) {
      return true;
    }
  }
  return false;
}

function replaceUrl (resourceUrl) {
  var newUrl = resourceUrl;
  for (var i in Config.urlToReplace) {
    newUrl = newUrl.replace(i, Config.urlToReplace[i]);
  }
  
  return newUrl;
}

function capture(url, callback) {
  var page = new WebPage(), contentType, status, monitor, ended = false;
  monitor = Monitor.create(function() {
    if (ended) { return; }
    ended = true;
    if (url.toLowerCase() !== page.url.toLowerCase()) {
      console.log(Date.now() + " URL to lower case doesn't match: " + url.toLowerCase() + " - " + page.url.toLowerCase());
      callback(404, null, '404');
    } else {
      callback(status, contentType || "text/html", page.evaluate(getPageContent));
    }
    page.close();
  });
  page.settings.loadImages = false;
  page.open(url);
  page.onResourceReceived = function(resource) {
    if (resource.url == url) {
      status = resource.status;
      contentType = getContentType(resource.headers);
      page.onResourceRequested = function (requestData, networkRequest) {
        console.log(Date.now() + " Request: " + requestData.url);
        if (isForbiddenContent(requestData.url)) {
          console.log(Date.now() + " Abording request: " + requestData.url);
          networkRequest.abort();
        } else {
          var newUrl = replaceUrl(requestData.url);
          if (newUrl != requestData.url) {
            networkRequest.changeUrl(newUrl);
          }

          monitor.notifyRequest.apply(null, [newUrl]);
        }
      };
      page.onResourceReceived = page.onResourceError = monitor.notifyResponse;
    }
  };
  
  page.onCallback = function (data) {
    if (data.error) {
      console.log('ERROR', data.data);
    } else {
      console.log(Date.now() + " notifyLoadEnded");
      monitor.notifyLoadEnded();
    }
  };
}

module.exports = capture;