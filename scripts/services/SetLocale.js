'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.factory:search
 * @description
 * # search
 * Factory of search
 */
angular.module('orangeRitmicApp')
  .service('SetLocale', ['$http', '$q', 'Globals', function ($http, $q, Globals) {
    var baseLocale,
        baseCountry,
        currentCountry;
    
    var SetLocale = {
      setBaseLocale: function (locale, country) {
        baseLocale = locale;
        baseCountry = country;
        
        SetLocale.setCountry(country, function () {});
      },
      
      setCountry: function (_country, _callback) {
        var country = _country,
            callback = _callback;
        
        if (!callback) {
          callback = country;
          country = baseCountry;
        }
        
        if (country === currentCountry) {
          return callback();
        }
        
        currentCountry = country;
        
        $http({
          url: Globals.API_PATH + '/user/setLocale/' + baseLocale + '/' + (country || currentCountry)
        }).then(callback);
      },
      
      __setCountry: $q.when(function(country){
        if(!country){
          country = baseCountry;
        }
        if (country === currentCountry) {
          return;
        }
        return $http({
          url: Globals.API_PATH + '/user/setLocale/' + baseLocale + '/' + (country || currentCountry)
        });
      })
    };
    
    return SetLocale;
    
  }]);
