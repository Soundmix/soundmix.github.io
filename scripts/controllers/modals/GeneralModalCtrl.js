'use strict';

angular.module('orangeRitmicApp')
  .controller('GeneralModalCtrl', function ($rootScope, $scope, $uibModalInstance, Globals, item) {
    $scope.item = item;

    $scope.appendToPlaystack = function () {
      $rootScope.$broadcast(Globals.EVENTS.PLAY_OBJECT_LATER, $scope.item);
      $uibModalInstance.close();
    };

    $scope.goToAlbum = function () {
      console.log('goToAlbum', item.getTitleLink());
      window.location.href = item.getTitleLink();
      $uibModalInstance.close();
    };

    $scope.goToArtist = function () {
      window.location.href = item.getSubtitleLink();
      $uibModalInstance.close();
    };

    $scope.share = function () {
      $rootScope.$broadcast(Globals.EVENTS.SHARE_OBJECT, $scope.item);
      $uibModalInstance.close();
    };

    $scope.close = function () {
      $uibModalInstance.dismiss();
    };
  });
