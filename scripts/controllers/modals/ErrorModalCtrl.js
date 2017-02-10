'use strict';

angular.module('orangeRitmicApp')
  .controller('ErrorModalCtrl', function ($rootScope, $scope, $uibModalInstance, item) {
    console.log('ErrorModalCtrl');

    $scope.errorText = item;

    $scope.close = function () {
      $uibModalInstance.dismiss();
    };
  });
