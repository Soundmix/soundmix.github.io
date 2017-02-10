'use strict';

// TODO may be deleted (no longer used in topTracks)

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
  .filter('indexFilter', function(){
  return function (arr, min, max) {
      return arr.filter(function(item, index){
        return (min <= index) && (index < max);
      });
  };
});
