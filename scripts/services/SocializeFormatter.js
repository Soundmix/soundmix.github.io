'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.factory:SocializeFormatter
 * @description
 * Factory of SocializeFormatter
 */
angular.module('orangeRitmicApp')
  .service('SocializeFormatter', ['Globals', '$location', '$rootScope', '$routeParams', '$filter', 'URLFormatter', 'Responsive', function (Globals, $location, $rootScope, $routeParams, $filter, URLFormatter, Responsive) {

    var SocializeFormatter = {
      formatToLike: function () {
        var url = URLFormatter.getBaseUrl();

        if ($routeParams.playlistId) {
          url += '#!/' + $rootScope.locale + '/playlist/' + $routeParams.playlistId;
        } else if ($routeParams.channel) {
          url += '#!/' + $rootScope.locale + '/channel/' + $routeParams.channel;
        } else {
          url += '#!/' + $rootScope.locale + '/' + $rootScope.country + '/artist/' + $routeParams.artist;
          if ($routeParams.album) {
            url += '/album/' + $routeParams.album;
          }
        }


        return url;
      },
      formatToShare: function (network, object) {
        var url;

        switch (network) {
          case 'facebook':
            url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(object.getSharePath());
            break;
          case 'twitter':
            url = 'https://twitter.com/home?status=' + encodeURIComponent(object.getTwitterShareText());
            break;
          case 'gplus':
            url = 'https://plus.google.com/share?url=' + encodeURIComponent(object.getSharePath());
            break;
        }

        return url;
      },
      formatToSharePlaylist: function (network, playlist) {
        var urlToShare = URLFormatter.getBaseUrl(),
            url;

        urlToShare += '#!/' + $rootScope.locale + '/' + $rootScope.country + '/playlists/' + playlist.getId();
        urlToShare = encodeURIComponent(urlToShare);

        switch (network) {
          case 'facebook':
            url = 'https://www.facebook.com/sharer/sharer.php?u=' + urlToShare;
            break;
          case 'twitter':
            url = 'https://twitter.com/home?status=' + urlToShare;
            break;
          case 'gplus':
            url = 'https://plus.google.com/share?url=' + urlToShare;
            break;
        }

        return url;
      },
      onClickShareLink: function (network, track) {
        var url = SocializeFormatter.formatToShare(network, track);

        if (Responsive.isMobile()) {
          window.open(url, network);
        } else {
          window.open(url, network, 'height=400, width=550');
        }
      },

      onClickShareLinkPlaylist: function (network, playlist) {
        var url = SocializeFormatter.formatToSharePlaylist(network, playlist);

        if (Responsive.isMobile()) {
          window.open(url, network);
        } else {
          window.open(url, network, 'height=400, width=550');
        }
      }
    };

    return SocializeFormatter;

  }]);
