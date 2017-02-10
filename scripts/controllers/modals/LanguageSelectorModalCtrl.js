'use strict';

angular.module('orangeRitmicApp')
  .controller('LanguageSelectorModalCtrl', function ($rootScope, $scope, $uibModalInstance) {
    console.log('LanguageSelectorModalCtrl');

    $scope.currentLocale = $rootScope.locale;
    $scope.availableLanguages = AVAILABLE_LOCALES;

    $scope.changeLocale = function (locale) {
      $rootScope.changeLocale(locale);
      $uibModalInstance.close();
    };

    $scope.close = function () {
      $uibModalInstance.dismiss();
    };
  });
