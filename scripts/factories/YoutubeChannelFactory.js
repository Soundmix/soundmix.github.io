'use strict';

(function () {
  angular.module('orangeRitmicApp')
    .factory('YoutubeChannelFactory', ['$rootScope', '$filter', 'Globals', 'URLFormatter', 'YoutubeVideoFactory', 'SearchRaw', function ($rootScope, $filter, Globals, URLFormatter, YoutubeVideoFactory, SearchRaw) {
      
      var YoutubeChannel = function (object) {
        this.object = object;
        if (object.video) {
          this.video = YoutubeVideoFactory.createYoutubeVideo(object.video);
          this.lastVideoDate = new Date(this.video.object.creationDate);
        }
      };
      
      var createYoutubeChannel = function (rawChannel) {
        return new YoutubeChannel(rawChannel);
      };
      
      var getChannel = function (id) {
        return SearchRaw.getYoutubeChannel(id)
          .then(createYoutubeChannel);
      };
      
      YoutubeChannel.prototype = {
        getTitle: function () {
          return this.object.title;
        },
        getSubtitle: function () {
          return $filter('translate')('YOUTUBE_CHANNEL_ITEM_UPDATED') + ' ' + $filter('date')(this.lastVideoDate, 'mediumDate');
        },
        getEscapedSubtitle: function () {
          return $filter('escapeQuotes')(this.object.description);
        },
        getModalSubtitle: function () {
          return this.getSubtitle();
        },
        getId: function () {
          return this.object.id;
        },
        getArtistId: function () {
          return null;
        },
        getType: function () {
          return Globals.OBJECT_TYPES.YOUTUBE_CHANNEL;
        },
        getItems:function (callback) {
          callback(this.items);
        },
        getImage: function () {
          return this.object.iconUrl;
        },
        getTitleLink: function () {
          return URLFormatter.generateYoutubeChannelUrl(this.getId());
        },
        getSubtitleLink: function () {
          return this.getTitleLink();
        },
        getSharePath: function () {
          return URLFormatter.generateYoutubeChannelUrl(this.getId());
        },
        getTwitterShareText: function () {
          return $filter('translate')('TWITTER_YOUTUBE_CHANNEL_SHARE_TEXT', {channel: this.object, url: this.getSharePath()});
        },
        getArtistSlug: function () {
          return null;
        },
        getAlbumSlug: function () {
          return null;
        },
        // getShopLink: function () {
          // return null;
        // },
        getSchemaItemType: function () {
          return 'http://schema.org/video';
        },
        getPlayAnalyticsEvent: function () {
          return Globals.ANALYTICS.LABEL.PLAY_YOUTUBE_CHANNEL;
        },
        getDescription: function () {
          return this.object.description;
        },
        getModalLink: function () {
          return 'MODAL_LINK_YOUTUBE_CHANNEL';
        },
        // isAddable: function () {
          // return false;
        // }
      };

      var YoutubeChannelFactory = {
          createYoutubeChannel: createYoutubeChannel,
        updateRawChannelList: function (rawChannels) {
          return rawChannels.map(function (rawChannel) {
            return YoutubeChannelFactory.createYoutubeChannel(rawChannel.basic);
          });
        },
        getChannel: getChannel,
        getLive:  function () {
          return SearchRaw.getLive().then(YoutubeChannelFactory.updateRawChannelList);
        },
        // getHiQ:  function (country) {
          // return SearchRaw.getHiQ(country).then(YoutubeChannelFactory.updateRawChannelList);
        // },
        // getLoQ:  function (country) {
          // return SearchRaw.getLoQ(country).then(YoutubeChannelFactory.updateRawChannelList);
        // },
      };

      return YoutubeChannelFactory;
    }]);
}());
