'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.factory:Player
 * @description
 * This is a youtube player wrapper which handle Youtube player and add support for playstack.
 */

(function () {
  angular.module('orangeRitmicApp')
    .factory('Player', ['$rootScope', 'Analytics', 'Globals', 'Search', function ($rootScope, Analytics, Globals, Search) {
      /*
       * Definition of Youtube internal states
       */
      var YoutubePlayerStates = {
        UNSTARTED: -1,
        ENDED: 0,
        PLAYING: 1,
        PAUSED: 2,
        BUFFERING: 3,
        CUED: 4
      };
      /*
       * Definition of Youtube internal errors
       */
      var YoutubePlayerErrorStates = {
        INVALID_PARAM: 'InvalidParameter',
        INVALID_ID: 'InvalidVideoID',
        NOT_ALLOWED: 'EmbeddedVideoNotAllowed'
      };

      /*
       * We add two things in the $rootScope
       * currentPlaystackIndex which is an integer which point to the current item playing
       * currentPlaystack which is an array describing the playstack
       * currentTrack is an object containing the current track information
       */
      $rootScope.currentPlaystackIndex = -1;
      $rootScope.currentPlaystack = [];
      $rootScope.currentTrack = null;


      function sortYoutubeVideos(track) {
        var trackDuration = track.getDuration();

        if (trackDuration) {
          trackDuration = trackDuration / 1000;

          var maxDistance = trackDuration * 0.33;
          var count = 0;

          while(count < track.youtube.videos.length) {
            var distance = Math.abs(track.youtube.videos[count].duration - trackDuration);

            if (distance > maxDistance) {
              track.youtube.videos.splice(count, 1);
            } else {
              count += 1;
            }
          }
        }

        track.youtube.videos.sort(function (a, b) {
          if (a.ratingCount > 100000 && b.ratingCount > 100000) {
            return 0;
          }
          if (a.ratingCount > b.ratingCount) {
            return -1;
          }
          if (a.ratingCount < b.ratingCount) {
            return 1;
          }
          return 0;
        });
      }

      /*
       * These are internation functions, they should not be called directly from external scripts
       */
      var ytPlayer,
          /*
           * @funcion
           * Callback called when the player is ready to receive orders
           */
          onPlayerReady = function () {
            if (ytPlayer.isMuted()) {
              ytPlayer.unMute();
            }

            ytPlayer.setVolume(50);
          },
          /*
           * @function
           * Callback called when the player state has changed
           */
          onPlayerStateChange = function (data) {
            console.log('onPlayerStateChange', data);
            var state = data.target ? data.data : data;
            switch (state) {
              case YoutubePlayerStates.ENDED:
                playNext();
                break;
            }
          },
          /*
           * @function
           * Callback called when the player throw an error
           */
          onPlayerError = function (data) {
            console.log('onPlayerError', data);
            var errCode = data.data || data;
            var message = '';
            switch (errCode) {
              case 2:
                message = YoutubePlayerErrorStates.INVALID_PARAM;
                break;
              case 100:
                message = YoutubePlayerErrorStates.INVALID_ID;
                break;
              case 101:
              case 150:
                message = YoutubePlayerErrorStates.NOT_ALLOWED;
                break;
            }

            console.warn('playError');

            var track = $rootScope.currentTrack;
            if (track.canPlayAgain()) {
              playAgain();
            } else {
              Analytics.trackEvent(Globals.ANALYTICS.ACTION.PLAYER, Globals.ANALYTICS.CATEGORY.PLAY_VIDEO_ERROR);
              $rootScope.currentTrack.error = true;
              $rootScope.$broadcast(Globals.EVENTS.ERROR, Globals.ERRORS.PLAYER);
              playNext();
            }

          },
          /*
           * @function
           * Create the Youtube player
           * @param {string} media - the Youtube media Id to play
           */
          createYTPlayer = function (media) {
            if (!ytPlayer) {
              ytPlayer = new YT.Player('playerContainer', {
                height: '210',
                width: '300',
                videoId: media,
                playerVars: { 'autoplay': 1 },
                events: {
                  onReady: onPlayerReady,
                  onStateChange: onPlayerStateChange,
                  onError: onPlayerError
                }
              });
            } else {
              ytPlayer.loadVideoById(media, 0, 'medium');
            }
          },
          /*
           * @function
           * Try to get a random track in the list. If only one item is in the list then return -1
           */
          getNextRandomIndex = function () {
            if ($rootScope.currentPlaystack.length > 1) {
              var index;
              do {
                index = Math.round((Math.random() * $rootScope.currentPlaystack.length) % $rootScope.currentPlaystack.length);
              } while (index === $rootScope.currentPlaystackIndex);

              return index;
            } else {
              return -1;
            }
          },
          playAgain = function () {
            $rootScope.currentTrack.youtube.currentIndex += 1;
            _playTrack($rootScope.currentPlaystackIndex);
          },
          /*
           * @function
           * Play the next item in the playstack
           */
          playNext = function () {
            var index;
            if (shuffleActive) {
              index = getNextRandomIndex();
              _playTrack(index);
            } else {
              index = $rootScope.currentPlaystackIndex + 1;
              if (index < $rootScope.currentPlaystack.length) {
                _playTrack(index);
              } else {
                console.warn('nothing else to play');
                stopPlayback(true);

                $rootScope.currentPlaystackIndex = -1;
                $rootScope.$applyAsync();
              }
            }
          },
          /*
           * @function
           * Play the previous item in the playstack
           */
          playPrevious = function () {
            var index = $rootScope.currentPlaystackIndex - 1;
            if (index >= 0) {
              _playTrack(index);
            }
          },
          /*
           * @function
           * Play the track from the currentPlaystack
           * @param {int} index - the index of the track in the playstack
           */
          _playTrack = function (index) {
            var track = $rootScope.currentPlaystack[index];
            console.log('_playTrack', index, track);

            if (!track) {
              console.warn('error _playTrack', index, $rootScope.currentPlaystack);
              stopPlayback(true);
              return;
            }

            if (!track.youtube) {
              return findYoutubeTrack(track, function () {
                _playTrack(index);
              });
            }

            $rootScope.$broadcast(Globals.EVENTS.TRACK_PLAYING, track);

            if (track.error) {
              return _playTrack(index + 1);
            }

            if (ytPlayer) {
              stopPlayback();
            }

            createYTPlayer(track.getCurrentVideoId());
            Analytics.trackEvent(Globals.ANALYTICS.ACTION.PLAYER, Globals.ANALYTICS.CATEGORY.PLAY_VIDEO);

            $rootScope.currentPlaystackIndex = index;
            $rootScope.currentTrack = track;

            $rootScope.$applyAsync();
          },
          /*
           * @function
           * Add an array of items to the playstack
           * @param {array} playstack - An array of items to add to the playstack
           * @param {bool} playFirst - Determine whether or not the first item in this array should be read (this
           * parameter allow to make a difference between adding items or playing items
           */
          _addItemlist = function (list, playFirst) {
            var nbTrack = list.length;

            var currentIndex = $rootScope.currentPlaystackIndex + 1;

            if (playFirst) {
              Array.prototype.splice.apply($rootScope.currentPlaystack, [currentIndex, 0].concat(list));
            } else {
              Array.prototype.push.apply($rootScope.currentPlaystack, list);
            }

            if (playFirst || nbTrack === 0) {
              _playTrack(currentIndex);
            }
          },
          /*
           * @function
           * Remove an item from the currentPlaystack
           * @param {int} index - the index of the item to delete
           */
          _removeFromPlaystack = function (index) {
            $rootScope.currentPlaystack.splice(index, 1);

            if ($rootScope.currentPlaystackIndex > index) {
              $rootScope.currentPlaystackIndex -= 1;
            } else {
              if ($rootScope.currentPlaystackIndex === index) {
                _playTrack(index);
              }
            }
          },
          /*
           * @function
           * Stop the current playback (this do not pause the video, it stop the entire Youtube player)
           * to pause the video just press the "pause" button in the Youtube player's control bar
           */
          stopPlayback = function (destroy) {
            $rootScope.currentPlaystackIndex = -1;
            $rootScope.currentTrack = null;
            if (ytPlayer) {
              if (destroy) {
                ytPlayer.destroy();
                ytPlayer = null;
              } else {
                ytPlayer.stopVideo();
              }
            }
          },
          /*
           * @function
           * Search youtube video from a iTunes track. This function search results through the Search service
           * If a response is found the youtube information (youtube video id) will be added to the track into the "youtube" attribute
           * @param {object} track - The track we want to search a youtube video.
           * @param {function} callback - The function called when a youtube video has been found or an error occured
           */
          findYoutubeTrack = function (track, callback) {
            if (!track.youtube) {
              Search.youtubeTrack(track.object.artistName + ' ' + track.object.title, $rootScope.country)
                .success(function (response) {
                  if (response.data && response.data.results.length > 0) {
                    track.youtube = {
                      videos: [],
                      currentIndex: 0
                    };

                    for (var i = 0; i < response.data.results.length; i += 1) {
                      track.youtube.videos.push(response.data.results[i].basic);
                    }

                    sortYoutubeVideos(track);

                    callback(false, track);
                  } else {
                    track.youtube = true;
                    track.error = true;
                    callback(true);
                  }
                })
                .error(function () {
                  track.youtube = true;
                  track.error = true;
                  callback(true);
                });
            } else {
              callback(false, track);
            }
          };


      var shuffleActive = false;

      /*
       * The player object which will be exposed to the entire AngularJS Application
       */
      var player = {
        /*
         * @function
         * Request the player to play a track according to its index in the currentPlaystack
         * @param {int} index - the index of the track
         */
        playTrackByIndex: function (index) {
          _playTrack(index);
        },
        /*
         * @function
         * Request the player to play the next track in the playstack
         */
        playNext: function () {
          playNext();
        },
        /*
         * @function
         * Request the player to play the previous track in the playstack
         */
        playPrevious: function () {
          playPrevious();
        },
        canPlayNext: function () {
          if (shuffleActive) {
            return true;
          }

          if ($rootScope.currentPlaystackIndex < $rootScope.currentPlaystack.length - 1) {
            return true;
          }

          return false;
        },
        canPlayPrevious: function () {
          if ($rootScope.currentPlaystackIndex > 0) {
            return true;
          }

          return false;
        },
        /*
         * @function
         * Add a playstack to the currentPlaystack and play the first item added
         * @param {array} playstack - An array of item to add to the playstack
         */
        playList: function (list) {
          console.log('play list');
          _addItemlist(list, true);
        },
        /*
         * @function
         * Add a playstack to the currentPlaystack, do not play any of its item unless the is no other items in the playstack
         */
        addItemlist: function (list) {
          console.log('addItemlist');
          _addItemlist(list, false);
        },
        /*
         * @function
         * Clear the playstack and stop the current playback
         */
        clearPlaystack: function () {
          stopPlayback(true);
          $rootScope.currentPlaystack = [];
          $rootScope.currentPlaystackIndex = -1;
          $rootScope.currentTrack = null;
        },
        /*
         * Toggle the shuffle mode and return whether or not it is activated
         */
        toggleShuffle: function () {
          shuffleActive = !shuffleActive;
          return shuffleActive;
        },
        /*
         * @function
         * Remove an item from the playstack. If the item is the one currently playing then play the next track
         */
        removeFromPlaystack: function (index) {
          _removeFromPlaystack(index);
        }
      };

      /*
       * Define a callback to play the requested track whenever the player is ready
       */
      window.onYouTubeIframeAPIReady = function () {
        if ($rootScope.currentTrack) {
          player.playTrack($rootScope.currentTrack);
        }
      };

      /*
       * Add youtube player's scripts to the DOM
       */
      var scriptSrc = 'https://www.youtube.com/iframe_api';
      var script = document.createElement('script');
      script.src = scriptSrc;
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

      return player;
    }]);
}());
