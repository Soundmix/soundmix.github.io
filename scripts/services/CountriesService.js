'use strict';


angular.module('orangeRitmicApp')
  .service('CountriesService', ['Globals', function (Globals) {
    var CountriesService = {
      isValidCountry: function (_country) {
        var country = _country && _country.toLowerCase();

        if (country && Globals.COUNTRIES.indexOf(country) >= 0) {
          return true;
        } else {
          return false;
        }
      },
      isTopPlaylistCountry: function (country) {
        if (COUNTRIES_TO_TAGS[country]) {
          return true;
        } else {
          return false;
        }
      },
      getDefaultCountry: function (locale) {
        return LOCALES_TO_COUNTRIES[locale] || Globals.DEFAULT_COUNTRY;
      },
      getCountryContinent: function (country){
        return Globals.CONTINENT_ORDER.find(function (continent) {
          return -1 !== Globals.COUNTRIES_REPARTITION[continent].indexOf(country);
        }).toLowerCase();
      }
    };
    
    return CountriesService;
    
  }]);
