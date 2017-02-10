'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.controller:TopChartsCtrl
 * @description
 * # AboutCtrl
 * Controller of the orangeRitmicApp
 * Requests the music review and live youtube channels to display them.
 */
angular.module('orangeRitmicApp')
  .controller('TopReviewsCtrl', ['$scope', '$rootScope', '$routeParams', 'Globals', 'YoutubeChannelFactory', 'OpenGraph', 'Shuffle', function ($scope, $rootScope, $routeParams, Globals, YoutubeChannelFactory, OpenGraph, Shuffle) {
    
    var setOpenGraphData = function () {
      OpenGraph.setTitle('TOP_REVIEWS_PAGE_META_TITLE');
      OpenGraph.setDescription('TOP_REVIEWS_PAGE_META_DESCRIPTION');
      OpenGraph.setKeywords('TOP_REVIEWS_PAGE_META_KEYWORDS');
    };
    
    var search = function () {
      $scope.country = LOCALES_TO_COUNTRIES[$routeParams.locale].toUpperCase();
      $scope.getLive = YoutubeChannelFactory.getLive;
      // $scope.getHiQ = function () {
        // return YoutubeChannelFactory.getHiQ($scope.country);
      // }
      // $scope.getLoQ = function () {
        // return YoutubeChannelFactory.getLoQ($scope.country);
      // }
    };
    
    setOpenGraphData();
    search();
}]);