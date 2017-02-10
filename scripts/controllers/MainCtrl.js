'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.controller:MainCtrl
 * @description
 * Controller of the orangeRitmicApp it handle the rootScope
 */
angular.module('orangeRitmicApp')
  .controller('MainCtrl', ['$rootScope', '$scope', '$translate', '$location', '$routeParams', '$filter', 'Analytics', 'Globals', 'Player', 'Search', 'OpenGraph', 'SetLocale', 'SocializeFormatter', 'Responsive', 'ModalService', 'CountriesService', 'CookiesService', 'tmhDynamicLocale', function ($rootScope, $scope, $translate, $location, $routeParams, $filter, Analytics, Globals, Player, Search, OpenGraph, SetLocale, SocializeFormatter, Responsive, ModalService, CountriesService, CookiesService, tmhDynamicLocale) {
    $scope.version = Globals.VERSION;
    $scope.tracksAdded = [];
    // $scope.playlistSignal = false;
    $scope.shuffleActive = false;
    $scope.privatePlaylist = false;
    $scope.desktopSearchInput = '';

    $rootScope.onClickShareLink = SocializeFormatter.onClickShareLink;
    $rootScope.serviceName = Globals.SERVICE_NAME;

    $scope.availableLanguages = AVAILABLE_LOCALES;
    // Current page url (without the locale)
    $scope.activePage = null;
    $scope.genres = Globals.GENRES;
    $scope.nbElements = 5;
    // $scope.numPageAddToPlaylist = 1;
    // $scope.genreNewPlaylist = 'all';
    // $scope.pagePlaylist = 5;
	
    // $scope.pagePlaylistMenu = 3;
    $scope.nbElementsMenu = 3;
    $scope.numPageMenu = 1;

    // $scope.languagePicker = { opened: false };
    // $scope.profilePicker = {opened: false};

    $scope.nowPlaying = {
      isPlaying: false,
      isMute: false
    };
    $rootScope.tracksById = {};
    $scope.displayMenu = false;


    $scope.scrollbarConfig = {
      autoHideScrollbar: true,
      advanced:{
        updateOnContentResize: true
      },
      scrollInertia: 0,
      axis: 'y',
      mouseWheel:{ preventDefault: true },
      touchMove:{ preventDefault: true }
    };

    function changeLocale(locale) {
      Globals.locale = locale.toLowerCase();
      if (locale !== $translate.use()) {
        $translate.use(Globals.locale);
        OpenGraph.setLanguage(Globals.locale);
      }
      $rootScope.locale = Globals.locale;
      OpenGraph.setAlternates(Globals.locale);
      tmhDynamicLocale.set(Globals.locale);
    }

    /*
     * RootScope Function
     * @description
     * This function location path change, it injects the right locale and country to the url
     */
    $rootScope.move = function (path, country, locale) {
      console.log('move', path, $rootScope.locale, $rootScope.country, '/' + $rootScope.locale + '/' + (country || $rootScope.country) + path);
      $location.path('/' + (locale || $rootScope.locale) + '/' + (country || $rootScope.country) + path);
    };

    $rootScope.moveNoCountry = function (path, locale) {
      $location.path('/' + (locale || $rootScope.locale) + path);
    };

    var getCountryContinent = function (country){
      return Globals.CONTINENT_ORDER.find(function (continent) {
        return -1 !== Globals.COUNTRIES_REPARTITION[continent].indexOf(country);
      }).toLowerCase();
    };
    
    /*
     * Event $routeChangeSuccess
     * @description
     * When this event is caught, update the current country and locale
     */
    var activeSection = $location.path();
    $scope.$on('$routeChangeSuccess', function () {
      console.log('routeChangeSuccess');

      OpenGraph.removeCanonical();
      OpenGraph.removeNoIndex();


      $scope.activePage = $location.path().substring(1);
      if ($routeParams.locale) {
        $scope.activePage = $scope.activePage.substring($routeParams.locale.length + 1);
      }
      console.log('$scope.activePage', $scope.activePage);

      if ($routeParams.locale) {
        changeLocale($routeParams.locale);
      }

      var currentCountry = $rootScope.country,
          paramsCountry = $routeParams.currentCountry;
      if (!paramsCountry) {
        if (currentCountry) {
          // DO nothing
        } else {
          // We don't have a defined country, we have to find one
          currentCountry = CountriesService.getDefaultCountry($rootScope.locale);
          //$rootScope.topPlaylistCountry = currentCountry;
        }
      } else {
        // If we have the country in the path
        if (currentCountry) {
          // If we also have the country in $rootScope
          if (currentCountry !== paramsCountry) {
            // If both are different
            if (CountriesService.isValidCountry(paramsCountry)) {
              currentCountry = paramsCountry;
              //$rootScope.topPlaylistCountry = paramsCountry;
            } else if (CountriesService.isTopPlaylistCountry(paramsCountry)) {
              //$rootScope.topPlaylistCountry = paramsCountry;
            } else {
              // The new country is not a real country then we should change page
              $rootScope.move('/playlists');
            }
          }
        } else {
          if (CountriesService.isValidCountry(paramsCountry)) {
            currentCountry = paramsCountry;
            //$rootScope.topPlaylistCountry = paramsCountry;
          } else {
            if (CountriesService.isTopPlaylistCountry(paramsCountry)) {
              //$rootScope.topPlaylistCountry = paramsCountry;
            }
            currentCountry = CountriesService.getDefaultCountry($rootScope.locale);
          }
        }
      }

      if ($rootScope.country !== currentCountry) {
        SetLocale.setBaseLocale(Globals.locale, currentCountry);
      }
      $rootScope.country = currentCountry;
      $rootScope.continent = getCountryContinent(currentCountry);

      window.scrollTo(0,0);
      activeSection = $location.path();
      OpenGraph.removeMetas();
    });
    


    $rootScope.menuLeftClick = function ($event, path, locale, noCountry) {
      // Close left menu
      if (Responsive.isMobile()) {
        $scope.displayMenu = false;
        $event.preventDefault();
        $event.stopPropagation();

        $('.container-fluid').one('transitionend', function () {
          if (locale) {
            $location.path('/' + (locale || $routeParams.locale) + path);
          } else {
            if (noCountry) {
              $rootScope.moveNoCountry(path);
            } else {
              $rootScope.move(path);
            }
          }

          refreshScope();
        });
      }
    };

    $scope.toggleDisplayMenu = function () {
      if (Responsive.isMobile()) {
        $scope.updateScrollbar('scrollTo', 0);
        $scope.updateScrollbar('disable');

      }

      $scope.displayMenu = !$scope.displayMenu;
    };

    // $scope.openLanguagePicker = function ($event) {
      // $event.preventDefault();
      // $event.stopPropagation();

      // if (Responsive.isMobile()) {
        // ModalService.openModal(Globals.MODALS_TYPES.LANGUAGE_SELECTOR);
      // } else {
        // $scope.languagePicker.opened = true;
      // }
    // };

    // $scope.openProfilePicker = function ($event) {
      // $event.preventDefault();
      // $event.stopPropagation();

      // if (Responsive.isMobile()) {
        // ModalService.openModal(Globals.MODALS_TYPES.PROFILE_SELECTOR);
      // } else {
        // $scope.profilePicker.opened = true;
      // }
    // };

    var refreshScope = function () {
      $scope.$applyAsync();
    };

    /*
     * Private function
     * @description
     * Handle track addition to the playlist, this function display the message "x tracks has been added to the playlist
     * This function uses also timeout to display the "track added" signal to the user to make him understand that he
     * can open the playlist panel
     */
    var notificationNumber = 0;
    var hasAlreadyOpen = false;
    var trackAdded = function (number) {
      addNotification($filter('translate')('NOTIFICATION_TRACK_ADDED', {trackNumber: number}));

      if (!hasAlreadyOpen) {
        $scope.playlistSignal = true;

        refreshScope();
        setTimeout(function () {
          $scope.playlistSignal = false;

          refreshScope();
        }, 2000);
      }
    };

    $scope.notifications = [];
    var addNotification = function (text) {
      $scope.notifications.push({
        text: text,
        id: notificationNumber
      });

      notificationNumber += 1;

      setTimeout(function () {
        $scope.notifications.splice(0,1);
        refreshScope();
      }, 5000);
    };

    $scope.$on(Globals.EVENTS.USER_NOTIFICATION, function (event, text) {
      addNotification(text);
    });

    $scope.$on(Globals.EVENTS.PLAY_OBJECT, function (event, object) {
      console.log('PLAY_OBJECT', object, object.getPlayAnalyticsEvent && object.getPlayAnalyticsEvent());

      var analyticsEvent = object.getPlayAnalyticsEvent && object.getPlayAnalyticsEvent();
      if (analyticsEvent) {
        Analytics.trackEvent(Globals.ANALYTICS.ACTION.USER, Globals.ANALYTICS.CATEGORY.PLAY_DIRECT, analyticsEvent);
      }

      object.getItems(function (items) {
        Player.playList(items);
        trackAdded(items.length);
      });

      if (Responsive.isMobile()) {
        var body = $('body');
        body.stop().animate({scrollTop:0}, '500', 'swing');
      }
    });

    $scope.$on(Globals.EVENTS.PLAY_OBJECT_LATER, function (event, object) {
      console.log('PLAY_OBJECT_LATER', object);

      var analyticsEvent = object.getPlayAnalyticsEvent && object.getPlayAnalyticsEvent();
      if(analyticsEvent){
        Analytics.trackEvent(Globals.ANALYTICS.ACTION.USER, Globals.ANALYTICS.CATEGORY.PLAY_LATER, analyticsEvent);
      }

      object.getItems(function (items) {
        Player.addItemlist(items);
        trackAdded(items.length);
      });
    });

    // $scope.$on(Globals.EVENTS.ADD_TO_PLAYLIST, function (event, arrayOfObject) {
      // PlaylistService.needAuthenticationAndPlaylistsLoadedAsync(function (isAuthenticated) {
        // if (isAuthenticated) {
          // ModalService.openModal(Globals.MODALS_TYPES.ADD_TO_PLAYLIST, arrayOfObject);
        // }
      // });
    // });


    // TODO This code need to be fixed
    /*
    $scope.$watch('playstackOpen', function (newValue) {
      if (!newValue) { return; }
      hasAlreadyOpen = true;

      var playlist = $rootScope.currentPlaylist,
          index = $rootScope.currentPlaylistIndex;

      if (playlist.length === 0 || index < 0) { return; }

      var trackNodes = document.querySelectorAll('.playlist-list .playlist-item'),
          playlistContainer = document.querySelector('.playlist');

      playlistContainer.scrollTop = Math.max(0, trackNodes[index].offsetTop - (playlistContainer.offsetHeight / 2));
    });
    */

    $scope.isActive = function (sectionName) {
      return new RegExp(sectionName).test(activeSection);
    };

    $scope.search = function (searchString) {
      $scope.mobileSearchOpen = false;
      if (!searchString || searchString === '') { return; }
      $rootScope.move('/search');
      $location.search('term', searchString);
    };

    $scope.playTrack = function (index) {
      Player.playTrackByIndex(index);
    };

    $scope.removeFromPlaystack = function (index) {
      Player.removeFromPlaystack(index);
    };

    $scope.clearPlaystack = function () {
      Player.clearPlaystack();
    };

    $scope.toggleShuffle = function () {
      $scope.shuffleActive = Player.toggleShuffle();
    };

    // $scope.addTracksToPlaylist = function (tracks) {
      // $rootScope.$broadcast(Globals.EVENTS.ADD_TO_PLAYLIST, tracks);
    // };

    $scope.playNext = function () {
      Player.playNext();
    };

    $scope.playPrevious = function () {
      Player.playPrevious();
    };

    $scope.canPlayNext = Player.canPlayNext;
    $scope.canPlayPrevious = Player.canPlayPrevious;

    $scope.openModalToCurrentTrack = function () {
      ModalService.openGeneralItemModal($rootScope.currentTrack);
    };

    var generalErrorHandler;
    $scope.$on(Globals.EVENTS.ERROR, function (event, data) {
      if (data.type) {
        $scope.generalError = data.type;

        $rootScope.move('/topReviews');
      } else {
        console.warn(data);
        $scope.generalError = data;
      }

      clearTimeout(generalErrorHandler);
      generalErrorHandler = setTimeout(function () {
        $scope.generalError = null;

        refreshScope();
      }, Globals.ERROR_DISPLAY_TIMEOUT);
    });

    $scope.$on(Globals.EVENTS.PAGE_LOADED, function () {
      console.warn('PAGE_LOADED');
      if (typeof window.callPhantom === 'function') {
        setTimeout(function () {
          window.callPhantom({});
        }, 1);
      }
    });

    $scope.$on(Globals.EVENTS.SHARE_OBJECT, function (event, item) {
      ModalService.openModal(Globals.MODALS_TYPES.SHARE, item);
    });

    // $scope.gotoMyMusic = function ($event) {
      // $event.stopPropagation();
      // $event.preventDefault();

      // PlaylistService.needAuthenticationAndPlaylistsLoadedAsync(function (isAuthenticated) {
        // if (isAuthenticated) {
          // if (Responsive.isMobile()) {
            // $rootScope.menuLeftClick($event, '/myMusic', null, true);
          // } else {
            // $rootScope.moveNoCountry('/myMusic');
          // }
        // }
      // });
    // };

    // $scope.gotoMyProfile = function ($event) {
      // $event.stopPropagation();
      // $event.preventDefault();

      // PlaylistService.needAuthenticationAndPlaylistsLoadedAsync(function (isAuthenticated) {
        // if (isAuthenticated) {
          // if (Responsive.isMobile()) {
            // $rootScope.menuLeftClick($event, '/me', null, true);
          // } else {
            // $rootScope.moveNoCountry('/me');
          // }
        // }
      // });
    // };

    // $scope.gotoMyPlaylists = function ($event) {
      // $event.stopPropagation();
      // $event.preventDefault();

      // PlaylistService.needAuthenticationAndPlaylistsLoadedAsync(function (isAuthenticated) {
        // if (isAuthenticated) {
          // if (Responsive.isMobile()) {
            // $rootScope.menuLeftClick($event, '/myPlaylists', null, true);
          // } else {
            // $rootScope.moveNoCountry('/myPlaylists');
          // }
        // }
      // });
    // };

    // In rootscope because it is needed in LanguageSelectorModal
    $rootScope.changeLocale = function (locale) {
      changeLocale(locale);
    };

    $scope.acceptCookies = function () {
      CookiesService.setCookie('cnil', $scope.cookiesAccepted = true);
    };

    if (typeof window.callPhantom === 'function') {
      $scope.cookiesAccepted = true;
    } else {
      $scope.cookiesAccepted = CookiesService.getCookie('cnil');
    }

    // Prevent bouncing beyond page limit
    document.addEventListener('toutchmove', function (e) {
      e.preventDefault();
    });

    document.body.style.display = 'block';
  }]);
