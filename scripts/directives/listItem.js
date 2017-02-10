'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.directive:listitem
 * @description
 * This directive is used to factorize the list item template
 * Each item can either play its content or add to playlist
 */
angular.module('orangeRitmicApp')
  .directive('listitem', function () {
    return {
      templateUrl: 'views/template/listItem.html',
      scope: {
        number: '@',
        type: '@',
        displaySchema: '@',
        currentTrack: '=',
        item: '='
      },
      controller: function ($element, $scope, $rootScope, Globals, Responsive, ModalService) {
        
        $element.parent().addClass('list-item-' + $scope.type);

        $scope.playItem = function () {
          $rootScope.$broadcast(Globals.EVENTS.PLAY_OBJECT, $scope.item);
        };

        $scope.addToPlaystack = function () {
          $rootScope.$broadcast(Globals.EVENTS.PLAY_OBJECT_LATER, $scope.item);
        };

        $scope.onImageClick = function () {
          if (Responsive.isMobile()) {
            $scope.playItem();
          }
        };

        $scope.onCaptionClick = function () {
          if (Responsive.isMobile()) {
            $scope.onImageClick();
          }
        };

        $scope.openModal = function () {
          if (Responsive.isMobile()) {
            ModalService.openGeneralItemModal($scope.item);
          }
        };

        $scope.onTitleClick = function ($event) {
          if (Responsive.isMobile()) {
            $event.preventDefault();
          }
        };

        $scope.onSubtitleClick = function ($event) {
          if (Responsive.isMobile()) {
            $event.preventDefault();
          }
        };

        $scope.addToPlaylist = function () {
          $scope.item.getItems(function (tracks) {
            $rootScope.$broadcast(Globals.EVENTS.ADD_TO_PLAYLIST, tracks);
          });
        };
		
        var elementNode = $element[0];

        var titleNode = $element[0].querySelector('[data-title-scope]');

        if ($scope.displaySchema) {
          elementNode.setAttribute('itemprop', 'album');
          elementNode.setAttribute('itemscope', '');
          elementNode.setAttribute('itemtype', 'http://schema.org/MusicAlbum');

          titleNode.setAttribute('itemprop', 'name');

          var meta = document.createElement('meta');
          meta.setAttribute('itemprop', 'url');
          meta.setAttribute('content', $scope.item.getTitleLink());

          titleNode.appendChild(meta);
        }
      }
    };
  });
