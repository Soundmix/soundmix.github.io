'use strict';

angular.module('orangeRitmicApp')
  .service('CookiesService', [function () {

    var service = {};

    service._getDomain = function () {
      var domainSplit = window.location.host.split('.');
      return domainSplit.slice(domainSplit.length - 2, domainSplit.length).join('.');
    };

    service.getCookie = function(cookieName) {
      var nameEQ = cookieName + '=';
      var cookiesList = document.cookie.split(';');
      for (var i = 0; i < cookiesList.length; i++) {
        var cookie = cookiesList[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
          return cookie.substring(nameEQ.length, cookie.length);
        }
      }
      return null;
    };

    service.setCookie = function(cookieName, value) {
      var date = new Date();
      date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
      document.cookie = cookieName + '=' + value + ';domain=.' + service._getDomain() + ';path=/;expires=' + date.toUTCString() + ';';
    };

    service.deleteCookie = function(cookieName) {
      document.cookie = cookieName + '=; expires=Thu, 18 Dec 2013 12:00:00 UTC; domain=.' + service._getDomain() + ';path=/;';
    };

    return service;

  }]);
