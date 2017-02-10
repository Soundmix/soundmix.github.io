'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.directive:backToTop
 * @description
 * This directive is a simple link to go to the top of the page
 */
angular.module('orangeRitmicApp')
  .directive('backToTop', function () {
    return {
      template: '<span class="back-to-top" ng-click="scrollTop()">{{ \'BACK_TO_TOP\' | translate }}</span>',
      scope: {},
      controller: function ($scope) {
        $scope.scrollTop = function () {
          var body = $('body');
          body.stop().animate({scrollTop:0}, '500', 'swing');
        };
      }
    };
  });

