'use strict';

angular.module('orangeRitmicApp')
  .controller('ShareModalCtrl', function ($rootScope, $scope, $uibModalInstance, SocializeFormatter, item) {
    console.log('ShareModalCtrl');

    $scope.item = item;
    $scope.share = function (network, item) {
      SocializeFormatter.onClickShareLink(network, item);
      $uibModalInstance.close();
    };

    $scope.close = function () {
      $uibModalInstance.dismiss();
    };
  });
