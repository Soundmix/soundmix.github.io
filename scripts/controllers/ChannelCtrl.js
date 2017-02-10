'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.controller:ChannelCtrl
 * @description
 * # ArtistCtrl
 * Controller of the orangeRitmicApp
 * for a Youtube channel
 */
angular.module('orangeRitmicApp')
  .controller('ChannelCtrl', ['$filter', '$scope', '$rootScope', '$routeParams', '$location', 'Globals', 'YoutubeChannelFactory', 'YoutubeVideoFactory', 'ModalService', 'OpenGraph', function ($filter, $scope, $rootScope, $routeParams, $location, Globals, YoutubeChannelFactory, YoutubeVideoFactory, ModalService, OpenGraph) {
    $scope.videosLoading = true;
    $scope.socializeOpened = false;
    $scope.nbTracks = 5;

    var channelIdRegex = /UC.*/;
    var channelId = channelIdRegex.exec($routeParams.channel)[0];
    if (!channelId) {
      $rootScope.move('');
      return;
    }

    YoutubeChannelFactory.getChannel(channelId)
      .then(function (channel) {
        $scope.channel = channel;
        OpenGraph.setTitle('YOUTUBE_CHANNEL_PAGE_META_TITLE', $scope.channel.object);
        OpenGraph.setDescription('YOUTUBE_CHANNEL_PAGE_META_DESCRIPTION', $scope.channel.object);
        OpenGraph.setKeywords('YOUTUBE_CHANNEL_PAGE_META_KEYWORDS', $scope.channel.object);
        OpenGraph.setMetas({
          'og:type': 'video.other',
          'og:title': $scope.channel.getTitle(),
          'og:url': $scope.channel.getTitleLink()
        });
      });
    
    YoutubeVideoFactory.getYoutubeChannelVideos(channelId)
      .then(function (videos) {
        $scope.allVideos = videos.videos;
        $scope.nextPageToken = videos.nextPageToken;
        $rootScope.$broadcast(Globals.EVENTS.PAGE_LOADED);
        $scope.videosLoading = false;
      });

    $scope.moreVideos = function () {
      $scope.videosLoading = true;
      YoutubeVideoFactory.getYoutubeChannelVideos(channelId + '-' + $scope.nextPageToken)
      .then(function (videos) {
        $scope.allVideos = $scope.allVideos.concat(videos.videos);
        $scope.nextPageToken = videos.nextPageToken;
        $scope.videosLoading = false;
      });

    };

    $scope.playAll = function () {
      $rootScope.$broadcast(Globals.EVENTS.PLAY_OBJECT, $scope.channel);
    };

    $scope.copyToPlaylist = function () {
      $rootScope.$broadcast(Globals.EVENTS.ADD_TO_PLAYLIST, $scope.allVideos);
    };

    $scope.shareObjectModal = function () {
      ModalService.openModal(Globals.MODALS_TYPES.SHARE, $scope.channel);
    };

  }]);
