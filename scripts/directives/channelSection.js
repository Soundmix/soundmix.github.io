'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.directive:channelsection
 * @description
 * This directive is a list of Youtube channels coming from a Copernic channel
 */

angular.module('orangeRitmicApp').directive(
    'channelsection', 
    function () { 
      return {
      templateUrl: 'views/template/channelSection.html',
      scope: {title : '=', getChannels: '='},
      controller: function ($scope, $http) {
        $scope.loading = true;
        $scope.getChannels()
          .then(function(channels){
            $scope.channels= channels;
			console.log($scope.channels);
            $scope.loading = false;
          });
        }
      }; 
    }
);