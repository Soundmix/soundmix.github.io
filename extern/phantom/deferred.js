"use strict";

function createDeferred(callback) {
  var timeoutId, ended;

  function maybe() {
//    console.log("[Deferred] maybe");
    if (ended) { return; }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(callback, 1000);
  }

  function cancel() {
    if (ended) { return; }
    if (timeoutId) {
//      console.log("[Deferred] cancel");
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }
  
  function end() {
//    console.log("[Deferred] end");
    if (ended) { return; }
    ended = true;
    clearTimeout(timeoutId);
    callback();
  }

  return {
    maybe: maybe,
    cancel: cancel,
    end: end
  }
}

module.exports = {
  create: createDeferred
}