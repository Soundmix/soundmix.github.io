'use strict';

angular.module('orangeRitmicApp')
  .service('ModalService', ['$uibModal', 'Globals', 'Responsive', function ($uibModal, Globals, Responsive) {

    var ModalServcice = {
      openGeneralItemModal: function (item) {
        ModalServcice.openModal(Globals.MODALS_TYPES.GENERAL, item);
      },
      openModal: function (modalType, item, callback) {
        console.log('openModal', item);

        var templateUrl = '';
        var controller;
        var resolver = {};

        switch (modalType) {
          case Globals.MODALS_TYPES.GENERAL:
            templateUrl = 'views/modals/general.html';
            controller = 'GeneralModalCtrl';
            resolver = {
              item: function () {
                return item;
              }
            };
            break;
          case Globals.MODALS_TYPES.AUTHENTICATION:
            templateUrl = 'views/modals/authentication.html';
            controller = 'AuthenticationModalCtrl';
            resolver = {
              isLogin: function () {
                return item;
              },
              onUserLogin: function () {
                return callback;
              }
            };
            break;
          case Globals.MODALS_TYPES.ADD_TO_PLAYLIST:
            templateUrl = 'views/modals/addToPlaylist.html';
            controller = 'AddToPlaylistModalCtrl';
            resolver = {
              arrayToAdd: function () {
                return item;
              }
            };
            break;
          case Globals.MODALS_TYPES.CREATE_PLAYLIST:
            templateUrl = 'views/modals/createPlaylist.html';
            controller = 'CreatePlaylistModalCtrl';
            break;
          case Globals.MODALS_TYPES.EDIT_PLAYLIST:
            templateUrl = 'views/modals/editPlaylist.html';
            controller = 'EditPlaylistModalCtrl';
            resolver = {
              playlist: function () {
                return item;
              }
            };
            break;
          case Globals.MODALS_TYPES.DELETE_PLAYLIST:
            templateUrl = 'views/modals/deletePlaylist.html';
            controller = 'DeletePlaylistModalCtrl';
            resolver = {
              playlist: function () {
                return item;
              }
            };
            break;
          case Globals.MODALS_TYPES.CHANGE_PASSWORD:
            templateUrl = 'views/modals/changePassword.html';
            controller = 'ChangePasswordCtrl';
            break;
          case Globals.MODALS_TYPES.SHARE:
            templateUrl = 'views/modals/share.html';
            controller = 'ShareModalCtrl';
            resolver = {
              item: function () {
                return item;
              }
            };
            break;
          case Globals.MODALS_TYPES.GENRE_SELECTOR:
            templateUrl = 'views/modals/genreSelector.html';
            controller = 'GenreSelectorModalCtrl';
            resolver = {
              currentGenre: function () {
                return item;
              }
            };
            break;
          case Globals.MODALS_TYPES.CONTINENT_SELECTOR:
            templateUrl = 'views/modals/continentSelector.html';
            controller = 'ContinentSelectorModalCtrl';
            resolver = {
              currentContinent: function () {
                return item;
              }
            };
            break;
          case Globals.MODALS_TYPES.TAG_SELECTOR:
            templateUrl = 'views/modals/tagSelector.html';
            controller = 'TagSelectorModalCtrl';
            resolver = {
              currentTag: function () {
                return item;
              }
            };
            break;
          case Globals.MODALS_TYPES.LANGUAGE_SELECTOR:
            templateUrl = 'views/modals/languageSelector.html';
            controller = 'LanguageSelectorModalCtrl';
            break;
          case Globals.MODALS_TYPES.PROFILE_SELECTOR:
            templateUrl = 'views/modals/profileSelector.html';
            controller = 'ProfileSelectorModalCtrl';
            break;
          case Globals.MODALS_TYPES.ERROR:
            templateUrl = 'views/modals/error.html';
            controller = 'ErrorModalCtrl';
            resolver = {
              item: function () {
                return item;
              }
            };
            break;
        }

        var modalInstance = $uibModal.open({
          animation: Responsive.isDesktop(),
          templateUrl: templateUrl,
          controller: controller,
          size: 'lg',
          resolve: resolver
        });

        return modalInstance.result;
      }
    };

    return ModalServcice;
  }]);
