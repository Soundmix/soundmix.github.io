'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.service:Responsive
 */
angular.module('orangeRitmicApp')
  .service('Responsive', [function () {
    var responsive = {
      isMobile: function () {
        if (ResponsiveBootstrapToolkit.is('<=sm')) {
          return true;
        } else {
          return false;
        }
      },
      isDesktop: function () {
        return !responsive.isMobile();
      }
    };

    return responsive;
  }]);
