'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.service:Shuffle
 * @description
 * # search
 * service to Shuffle array
 */
angular.module('orangeRitmicApp')
  .service('Shuffle', [function () {
    return function (o) {
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
      return o;
    };
  }]);