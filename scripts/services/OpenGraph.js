'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.factory:search
 * @description
 * # search
 * Factory of search
 */
angular.module('orangeRitmicApp')
  .service('OpenGraph', ['$filter', '$location', 'Globals', function ($filter, $location, Globals) {
    var headNode = document.head,
        currentMetas = [];

    return {
      setMetas: function (metas) {
        var metaNode;

        metas['fb:app_id'] = Globals.FB_APP_ID;
        metas['og:site'] = Globals.FB_SITE_NAME;

        for (var i in metas) {
          metaNode = document.createElement('meta');
          metaNode.setAttribute('property', i);
          metaNode.setAttribute('content', metas[i]);
          headNode.appendChild(metaNode);
          currentMetas.push(metaNode);
        }
      },
      setLanguage: function (language) {
        document.querySelector('meta[name=language]').setAttribute('content', language);
      },
      setAlternates: function (language) {
        var list = headNode.querySelectorAll('link[rel=alternate]');
        for (var i = 0; i < list.length; i++){
          headNode.removeChild(list.item(i));
        }
        AVAILABLE_LOCALES.map(function(lang){
          if(lang !== language) {
            var link = document.createElement('link');
            link.setAttribute('rel', 'alternate');
            link.setAttribute('hreflang', lang);
            link.setAttribute('href', '#!/' + lang + $location.path().substr(3));
            headNode.appendChild(link);
          }
        });
      },
      setTitle: function (titleI18NKey, object) {
        document.querySelector('title').innerHTML = $filter('translate')(titleI18NKey, object);
      },
      setDescription: function (descriptionI18N, object) {
        document.querySelector('meta[name=description]').setAttribute('content', $filter('translate')(descriptionI18N, object));
      },
      setKeywords: function (keywordI18N, object) {
        document.querySelector('meta[name=keywords]').setAttribute('content', $filter('translate')(keywordI18N, object));
      },
      setCanonical: function (content) {
        // <link href="http://www.example.com/canonical-version-of-page/" rel="canonical" />
        var link = document.querySelector('link[rel=canonical]');
        if (!link) {
          link = document.createElement('link');
          link.setAttribute('rel', 'canonical');
          headNode.appendChild(link);
        }

        var baseLocation = window.location.toString().split('#!')[0];

        link.setAttribute('href', baseLocation + content);
      },
      removeCanonical: function () {
        var link = document.querySelector('link[rel=canonical]');
        if (link && link.parentNode) {
          link.parentNode.removeChild(link);
        }
      },
      setNoIndex: function () {
        var meta = document.querySelector('meta[name=robots]');
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = 'robots';
          meta.content = 'noindex';
          document.head.appendChild(meta);
        }
      },
      removeNoIndex: function () {
        var meta = document.querySelector('meta[name=robots]');
        if (meta) {
          meta.parentNode.removeChild(meta);
        }
      },
      removeMetas: function () {
        for (var i = 0; i < currentMetas.length; i += 1) {
          headNode.removeChild(currentMetas[i]);
        }

        currentMetas = [];
      }
    };
  }]);
