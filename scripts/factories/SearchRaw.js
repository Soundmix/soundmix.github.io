'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.factory:Search
 * @description
 * This factory is used to called the API to get data
 */
angular.module('orangeRitmicApp')
  .factory('SearchRaw', ['$http', '$rootScope', '$q', 'Globals', function ($http, $rootScope, $q, Globals) {
    var metaSearchPath = Globals.API_PATH + '/search/meta/select';
    var getObjectPath = Globals.API_PATH + '/object/get';
    var searchItemPath = Globals.API_PATH + '/search/object/select';
    var youtubeSearchPath = Globals.API_PATH + '/search/object/select';
    var countryChannelPath = Globals.API_PATH + '/channel/getChannels';
    var getChannelPath = Globals.API_PATH + '/channel/getChannelContents';

    function broadcastError() {
      $rootScope.$broadcast(Globals.EVENTS.ERROR, Globals.ERRORS.API);
      return $q.reject();
    }

    // var metaSearch = function (universe, number, page, type, genre, country) {
      // var params = {
        // rows: number,
        // start: (page && page * number) || 0,
        // param2: genre || null,
        // param1: country,
        // metaName: type,
        // universe: universe
      // };
      // return $http({
        // url: metaSearchPath,
        // params: params
      // });
    // };
    
    var getObject = function (typePrefix, id) {
      return $http({url: getObjectPath + '/' + typePrefix + id})
        .then(getObjectResponse, broadcastError);
    };

    var youtubeSearch = function (universe, term) {
      var params = {
        rows: 10,
        start: 0,
        universe: universe,
        term: term
      };
      return $http({
        url: youtubeSearchPath,
        params: params
      });
    };

    var searchItems = function (universe, rows, page, country, term) {
      var params = {
        rows: rows,
        start: (page * rows) || 0,
        country_alpha2: country,
        term: term,
        universe: universe
      };
      return $http({url: searchItemPath, params: params})
        .then(getSearchObjectResponse, broadcastError);
    };

    /*************
     * OBJECT RESPONSES FORMATERS
     */
    var getObjectResponse = function (response) {
      if (response && response.data && response.data.data && response.data.data.basic) {
        return response.data.data.basic;
      } else {
        return broadcastError();
      }
    };

    // var getSearchObjectResponse = function(response) {
      // if (response && response.data && response.data.data && response.data.data.results) {
        // return {totalNumFound: response.data.data.totalNumFound, items: response.data.data.results.map(
            // function(object) {return object.basic;})};
      // } else {
        // return broadcastError();
      // }
    // };

    // var getMetaResponse = function(response) {
      // if (response && response.data && response.data.data && response.data.data.metas) {
        // return response.data.data.metas;
      // } else {
        // return broadcastError();
      // }
    // };


    /**************************
     * API CALLS
     */
    // var searchTracks = function (number, page, country, term) {
      // return searchItems(Globals.UNIVERSES.ITUNES_TRACK, number, page, country, term);
    // };

    // var topTracks = function (genre, country, nbItems) {
      // if (!genre) {
        // genre = 'all';
      // }
      // return getObject('chart-', country + '-' + genre + '-' + nbItems)
        // .then(function (data) {return data.itemList;});
    // };

    // var topAlbums = function (genre, country, nbItems) {
      // return metaSearch(Globals.UNIVERSES.ITUNES_ALBUM, nbItems, 0, 'topalbums', genre, country)
        // .then(getMetaResponse, broadcastError);
    // };

    // var getAlbum = function (id) {
      // return getObject('itunes_album-', id);
    // };

    // var getArtist = function (id) {
      // return getObject('itunes_artist-', id);
    // };
    
    // var getContinentCharts = function (continentCode) {
      // return getObject('continent_charts-', continentCode);
    // };

    // var searchArtists = function (number, page, country, term) {
      // return searchItems(Globals.UNIVERSES.ITUNES_ARTIST, number, page, country, term);
    // };

    // var searchAlbums = function (number, page, country, term) {
      // return searchItems(Globals.UNIVERSES.ITUNES_ALBUM, number, page, country, term);
    // };

    var getYoutubeChannel = function (id) {
      return getObject('youtube_channel-', id);
    };
	
    var findChannels = function (country) {
      return $http({
        url: countryChannelPath + '/youtube_channel/' + country
      });
    };

    var getChannel = function (universe, country, channelId) {
      return $http({
        url: getChannelPath + '/' + universe +'/' + country + '/' + channelId
      });
    };

    var getLive = function () {
		//return($http.get('../config/toptubersConfig.js');
      return getChannel('youtube_channel', 'US', '0000015727a6a91523989fffb0351408')
        .then(function (channel) {
          return channel.data.data.objects.elements[0].basic.list.objects.elements;
        });
    };
    
    // var getNamedChannel = function (country, name) {
      // return findChannels(country)
        // .then(function (channels) {
          // var id = channels.data.data.find(function (channel) {return name === channel.name;}).id;
          // return getChannel('youtube_channel', country, id);
        // })
        // .then(function (channel) {
          // return channel.data.data.objects.elements[0].basic.list.objects.elements;
        // });
    // };
    
    // var getHiQ = function (country) {
      // return getNamedChannel(country, 'mezik_hiq');
    // };
    
    // var getLoQ = function (country) {
      // return getNamedChannel(country, 'mezik_loq');
    // };
    
    return {
      // getObject: getObject,
      // getAlbum: getAlbum,
      // getArtist: getArtist,
      // topTracks: topTracks,
      // topAlbums: topAlbums,
      // getContinentCharts: getContinentCharts,
      // searchTracks: searchTracks,
      // searchAlbums: searchAlbums,
      // searchArtists: searchArtists,
	  
      youtubeTrack: function (term, country) {
        return youtubeSearch(Globals.UNIVERSES.YOUTUBE, term, country);
      },

      getYoutubeChannel: getYoutubeChannel,
      findChannels: findChannels,
      getLive: getLive,
      // getHiQ: getHiQ,
      // getLoQ: getLoQ,
      // getNamedChannel: getNamedChannel,
    };
  }]);
