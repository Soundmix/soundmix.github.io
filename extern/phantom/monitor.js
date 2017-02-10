"use strict";

var Deferred = require("./deferred");
var Config = require("./config.js");

function createMonitor(onCaptureReady) {
  var deferred, pendingRequests = Object.create(null);
  
  var monitorTimeoutHandler = null;
  var reinitTimeout = function () {
    clearTimeout(monitorTimeoutHandler);
    
    monitorTimeoutHandler = setTimeout(function () {
      console.log(Date.now() + " [Monitor] timeout", Object.keys(pendingRequests));
      deferred.end();
    }, Config.monitorTimeout);
  };
  
  reinitTimeout();

  function notifyRequest(resourceUrl) {
    console.log(Date.now() + " [Monitor]  >>>", Object.keys(pendingRequests).length, resourceUrl);
    deferred.cancel();
    pendingRequests[resourceUrl.toLowerCase()] = true;
    reinitTimeout();
  }

  function notifyResponse(resource) {
    if ((resource.errorCode || resource.stage == "end") && resource.url) {
      delete pendingRequests[resource.url.toLowerCase()];
      console.log(Date.now() + " [Monitor]  <<<", Object.keys(pendingRequests).length, "(" + resource.status + ")", resource.url);
      if (!Object.keys(pendingRequests).length) {
        deferred.maybe();
      }
      reinitTimeout();
    }
  }
  
  function resourceAborted(resource) {
    delete pendingRequests[resource.url];
    console.log(Date.now() + " [Monitor]  <<<", Object.keys(pendingRequests).length, resource.url);
    if (!Object.keys(pendingRequests).length) {
      deferred.maybe();
    }
    reinitTimeout();
  }
  
  function notifyLoadEnded() {
    clearTimeout(monitorTimeoutHandler);
    deferred.end();
  }

  deferred = Deferred.create(function() {
    console.log(Date.now() + " [Monitor]  onCaptureReady");
    clearTimeout(monitorTimeoutHandler);
    onCaptureReady();
  });
  
  return {
    notifyRequest: notifyRequest,
    notifyResponse: notifyResponse,
    resourceAborted: resourceAborted,
    notifyLoadEnded: notifyLoadEnded
  };
}

module.exports = {
  create: createMonitor
};