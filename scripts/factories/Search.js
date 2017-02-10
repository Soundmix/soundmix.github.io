'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.factory:Search
 * @description
 * This factory is used to called the API to get data
 */
angular.module('orangeRitmicApp')
  .factory('Search', ['SearchRaw', function (SearchRaw) {


    /**
     * KLUDGE FactoryAlbum to be able to get its items asynchronously
     * This kludge prevent circular dependency between Search and AlbumFactory
     * and between Search and ChartLinkFactory.
     */

    

    /**
     * KLUDGE END
     */


    /*************************
     * OBJECT UPDATERS
     *
    var updateTracks = function(tracks) {
      return tracks.map(function (track) {
        return TrackFactory.createTrack(track);
      });
    };

    var updateAlbums = function(albums) {
      return AlbumFactory.updateRawAlbumList(albums);
    };

    /**************************
     * API CALLS
     *
    var searchTracks = function (number, page, country, term) {
      return SearchRaw.searchTracks(number, page, country, term)
      .then(function (searchObject) {
        searchObject.items = TrackFactory.updateRawTrackList(searchObject.items);
        return searchObject;
      });
    };

    var topTracks = function (genre, country, nbItems) {
      return SearchRaw.topTracks(genre, country, nbItems)
        .then(updateTracks);
    };

    var topAlbums = function (genre, country, nbItems) {
      return SearchRaw.topAlbums(genre, country, nbItems)
        .then(updateAlbums);
    };

    var getAlbum = function (id) {
      return SearchRaw.getAlbum(id)
          .then(function (album) {
            return AlbumFactory.createAlbum(album);
          });
    };

    var getArtist = function (id) {
      return SearchRaw.getArtist(id)
        .then(function (artist) {
          return ArtistFactory.createArtist(artist);
        });
    };
    
    var getContinentCharts = function (continentCode) {
      return SearchRaw.getContinentCharts(continentCode)
        .then(function (continentCharts) {
          return ContinentChartsFactory.createContinentCharts(continentCharts);
        });
    };

    var searchArtists = function (number, page, country, term) {
      return SearchRaw.searchArtists(number, page, country, term)
        .then(function (searchObject) {
          searchObject.items = ArtistFactory.updateRawArtistList(searchObject.items);
          return searchObject;
        });
    };

    var searchAlbums = function (number, page, country, term) {
      return SearchRaw.searchAlbums(number, page, country, term)
        .then(function (searchObject) {
          searchObject.items = AlbumFactory.updateRawAlbumList(searchObject.items);
          return searchObject;
        });
    };
	*/
	
    return {
      youtubeTrack: SearchRaw.youtubeTrack
    };
  }]);
