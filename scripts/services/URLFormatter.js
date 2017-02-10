'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.factory:SocializeFormatter
 * @description
 * Factory of SocializeFormatter
 */
angular.module('orangeRitmicApp')
  .service('URLFormatter', ['Globals', '$location', '$rootScope', function (Globals, $location, $rootScope) {

    var URLFormatter = {
      getBaseUrl: function () {
        if (Globals.BASE_URL) {
          return Globals.BASE_URL;
        } else {
          var url = window.location.href;
          return url.split('#!')[0];
        }
      },
      
      getLocaleUrl: function () {
        var locale= $rootScope.locale;
        return URLFormatter.getBaseUrl() + '#!/' + locale;
      },
      
      getLocaleCountryUrl: function () {
        var country = $rootScope.country;
        return URLFormatter.getLocaleUrl() + '/' + country;
      },
      
      generateArtistURL: function (artist) {
        var artistSlug = artist.artistSlug || artist;
        return URLFormatter.getLocaleUrl() + '/artist/' + artistSlug;
      },
      
      generateAlbumURL: function (artist, album) {
        var albumSlug = album.albumSlug || album;
        return URLFormatter.generateArtistURL(artist) + '/album/' + albumSlug;
      },
      
      generateTrackURL: function (track) {
        var trackId = track.getId();
        return URLFormatter.generateAlbumURL(track.object.artistSlug, track.object.albumSlug) + '/track/' + trackId;
      },
      
      generatePlaylistURL: function (playlistId) {
        var url = URLFormatter.getLocaleUrl() + '/playlist/' + playlistId;
        return url;
      },
      
      generateChartURL: function (chartCountry) {
        var url = URLFormatter.getLocaleUrl() + '/' + chartCountry + '/topTracks';
        return url;
      },
      
      generateYoutubeChannelUrl: function (youtubeChannelId) {
        return URLFormatter.getLocaleUrl() + '/channel/' + youtubeChannelId;
      },
      
      generateYoutubeVideoUrl: function (youtubeVideo) {
        return URLFormatter.generateYoutubeChannelUrl(youtubeVideo.object.channel) + '/video/' + youtubeVideo.getId();
      }
    };

    return URLFormatter;

  }]);
