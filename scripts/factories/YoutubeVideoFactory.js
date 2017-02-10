'use strict';

/**
 * The YoutubeVideo objects mimic the Track objects, but only return them selves as "videos"
 */

(function () {
  angular.module('orangeRitmicApp')
    .factory('YoutubeVideoFactory', ['$rootScope', '$filter', 'Globals', 'URLFormatter', 'SearchRaw', function ($rootScope, $filter, Globals, URLFormatter, SearchRaw) {

      var YoutubeVideo = function (object) {
        this.object = object;
        this.youtube = true; // some functions in Player.js test "track.youtube" to know whether to look for videos.
      };

      var createYoutubeChannelVideos = function (rawVideos) {
        var videos = rawVideos.videos.map(function (rawVideo) {return new YoutubeVideo(rawVideo);});
        rawVideos.videos = videos;
        return rawVideos;
      };
      
      var getYoutubeChannelVideos = function (id) {
        return SearchRaw.getObject("youtube_channel_videos-", id)
          .then(createYoutubeChannelVideos);
      };

      YoutubeVideo.prototype = {
        getTitle: function () {
          return this.object.title;
        },
        getSubtitle: function () {
          return this.object.description;
        },
        getModalSubtitle: function () {
          return this.object.description;
        },
        getId: function () {
          return this.object.id;
        },
        getCopernicId: function () {
          return 'youtube_video-' + this.object.id;
        },
        getAlbumId: function () {
          return null;
        },
        getType: function () {
          return Globals.OBJECT_TYPES.TRACK;
        },
        getItems: function (callback) {
          callback([this]);
        },
        getImage: function () {
          return this.object.iconUrl;
        },
        getTitleLink: function () {
          return URLFormatter.generateYoutubeVideoUrl(this.object.artistSlug, this.object.albumSlug);
        },
        getSubtitleLink: function () {
          return null;
        },
        getSharePath: function () {
          return 'http://youtube.com/watch?v=' + this.getId();
        },
        getTwitterShareText: function () {
          return $filter('translate')('TWITTER_YOUTUBE_VIDEO_SHARE_TEXT', {video: this.object, url: this.getSharePath()});
        },
        getDuration: function () {
          return this.getDurationMs();
        },
        getDurationMs: function () {
          return 1000 * this.object.duration;
        },
        getDurationSeconds: function () {
          return this.object.duration;
        },
        // getShopLink: function () {
          // return null;
        // },
        getArtistSlug: function () {
          return null;
        },
        getAlbumSlug: function () {
          return null;
        },
        getSchemaItemType: function () {
          return 'http://schema.org/video';
        },
        getPlayAnalyticsEvent: function () {
          return Globals.ANALYTICS.LABEL.PLAY_TRACK;
        },
        getCurrentVideoId: function () {
          return this.getId();
        },
        // isBuyable: function () {
          // return false;
        // },
        // isAddable: function () {
          // return false;
        // },
        canPlayAgain: function() {
          return false;
        }
      };
      
      var YoutubeVideoFactory = {
        createYoutubeVideo: function (video) {
          return new YoutubeVideo(video);
        },
        updateRawVideoList: function (rawVideos) {
          return rawVideos.map(function (video) {
            return YoutubeVideoFactory.createYoutubeVideo(video);
          });
        },
        getYoutubeChannelVideos: getYoutubeChannelVideos,
      };

      return YoutubeVideoFactory;
    }]);
}());
