'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.directive:headereffect
 * @description
 * This directive handles the header effect of the top tracks page, it displays alternatively each of the input images
 */
angular.module('orangeRitmicApp')
  .directive('headereffect', function () {
    return {
      template: '<div class="image-effect rotation{{ imageNumber }}" ng-class="{selected: imageNumber === selectedIndex}" ng-style="{backgroundImage: \'url({{image}})\'}" ng-repeat="(imageNumber, image) in imagesList"></div>',
      scope: {
        imagesList: '='
      },
      controller: function ($scope, Responsive) {
        $scope.selectedIndex = 0;

        $scope.$watch('imagesList', function () {
          $scope.selectedIndex = 0;
        });

        setInterval(function () {
          if (!Responsive.isMobile()) {
            $scope.selectedIndex = ($scope.selectedIndex + 1) % $scope.imagesList.length;
            $scope.$apply();
          }
        }, 30000);
      }
    };
  });
