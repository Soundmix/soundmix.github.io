'use strict';

/**
 * orderByTranslated Filter
 * Sort ng-options or ng-repeat by translated values
 * @example
 *   ng-repeat="scheme in data.schemes | orderByTranslated:'i18nKeyPrefix':'collectionName'"
 * @param  {Array|Object} array or hash
 * @param  {String} i18nKeyPrefix
 * @return {Array}
 */
angular.module('orangeRitmicApp')
  .filter('orderByTranslated', ['$translate', '$filter', function($translate, $filter) {
  return function (array, i18nKeyPrefix) {
    var result = [];
    var translated = [];
    angular.forEach(array, function(value) {
      var i18nKeySuffix = value;
      translated.push({
        key: value,
        label: $translate.instant(i18nKeyPrefix + i18nKeySuffix)
      });
    });
    angular.forEach($filter('orderBy')(translated, 'label'), function(sortedObject) {
      result.push(sortedObject.key);
    });
    return result;
  };
}]);