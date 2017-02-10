'use strict';

angular.module('orangeRitmicApp')
  .filter('escapeQuotes', function() {
    return function(input) {
      return input.replace(/([^\\])("|'|’)/g, '$1\\$2');
    };
  });