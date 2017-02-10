'use strict';

/**
 * @ngdoc overview
 * @name orangeRitmicApp
 * @description
 * # orangeRitmicApp
 *
 * Main module of the application.
 */
angular
  .module('orangeRitmicApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'angular-google-analytics',
    'ui.bootstrap',
    'ngScrollbars',
    'tmh.dynamicLocale'
  ])
  .config(function ($routeProvider, $httpProvider, $locationProvider, $translateProvider, $animateProvider, $compileProvider, AnalyticsProvider, tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('/extern/libs/angular/i18n/angular-locale_{{locale}}.js');
    var lang = navigator.language || navigator.userLanguage;
    lang = lang.substring(0,2).toLocaleLowerCase();

    if (AVAILABLE_LOCALES.indexOf(lang) < 0) {
      lang = 'en';
    }
    $translateProvider.preferredLanguage(lang);
    $translateProvider.fallbackLanguage('en');

    var defaultCountry = LOCALES_TO_COUNTRIES[lang];

    $routeProvider
      .when('/:locale/channel/:channel', {
        templateUrl: 'views/channel.html',
        controller: 'ChannelCtrl'
      })
	  .when('/:locale/topReviews', {
        templateUrl: 'views/topReviews.html',
        controller: 'TopReviewsCtrl'
      })
      .otherwise({
        redirectTo: lang + '/topReviews'
      });


    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.useApplyAsync = true;

    $compileProvider.debugInfoEnabled = false;

    $animateProvider.classNameFilter(/angular-animate/);

    AnalyticsProvider
      .useAnalytics(false)
      .ignoreFirstPageLoad(true);

    if (ANALYTICS && ANALYTICS !== 'false') {
      AnalyticsProvider.setAccount(ANALYTICS);
    } else {
      AnalyticsProvider.setAccount('UA-64481206-2');
      AnalyticsProvider
        .enterDebugMode(true)
        .logAllCalls(true);
    }

  });
