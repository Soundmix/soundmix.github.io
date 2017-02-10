'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.directive:tracklist
 * @description
 * This directive is used to display a table of tracks
 */
angular.module('orangeRitmicApp')
  .directive('tracklist', function () {
    return {
      templateUrl: 'views/template/trackList.html',
      scope: {
        tracks: '=',
        nbTracks: '=', // used to limit the number of tracks showed
        currentTrack: '=',
        selectedTrack: '=',
        displaySchema: '@'
      },
      controller: function ($element, $scope, $rootScope, $http, Globals,  ModalService) {
        $scope.country = $rootScope.country;
        $scope.locale = $rootScope.locale;

        $scope.playItem = function (track) {
          $rootScope.$broadcast(Globals.EVENTS.PLAY_OBJECT, track);
        };

        $scope.addToPlaystack = function (track) {
          $rootScope.$broadcast(Globals.EVENTS.PLAY_OBJECT_LATER, track);
        };
		
        $scope.openModal = function (track) {
          ModalService.openGeneralItemModal(track);
        };

        $scope.playAll = function() {
          var object = {
            getItems: function (callback) {
              if ($scope.nbTracks) {
                callback($scope.tracks.slice(0, $scope.nbTracks));
              } else {
                callback($scope.tracks);
              }
            }
          };
          $rootScope.$broadcast(Globals.EVENTS.PLAY_OBJECT, object);
        };


        $scope.$watch('tracks', function () {
          if ($scope.displaySchema) {
            setTimeout(function () {
              var elements = $element[0].querySelectorAll('[data-tracklist-item]');

              for (var i = 0; i < elements.length; i += 1) {
                var elementNode = elements[i],
                  artistNode = elements[i].querySelector('[data-tracklist-item-artist]'),
                  nameNode = elements[i].querySelector('[data-tracklist-item-name]');

                elementNode.setAttribute('itemprop', 'track');
                elementNode.setAttribute('itemscope', '');
                elementNode.setAttribute('itemtype', 'http://schema.org/MusicRecording');

                nameNode.setAttribute('itemprop', 'name');

                artistNode.setAttribute('itemprop', 'byArtist');
                artistNode.setAttribute('itemscope', '');
                artistNode.setAttribute('itemtype', 'http://schema.org/MusicGroup');
                artistNode.querySelector('span').setAttribute('itemprop', 'name');

                var artistMeta = document.createElement('meta');
                artistMeta.setAttribute('content', $scope.tracks[i].getSubtitleLink());
                artistMeta.setAttribute('itemprop', 'url');

                artistNode.appendChild(artistMeta);
              }
            }, 10);
          }
        });

      }
    };
  });
