'use strict';

/**
 * @ngdoc function
 * @name orangeRitmicApp.directive:socialize
 * @description
 * This controller aim to ease the use of social like buttons
 * Add this directive into the DOM like <socialize></socialize> and it will like the current page
 * Please note that this directive has two dependencies:
 * * A factory named Globals which must have a SOCIAL.locale (the current locale used for translation) and SOCIAL.LOCALES
 * which is a map of two char locales with 5 chars locales values)
 * * A service names SocializeFormatter which must have a formatToLike function which returns the formatted current URL
 * 
 */
angular.module('orangeRitmicApp')
  .directive('socialize', function (Globals, SocializeFormatter) {
      // Open every like button from social networks
      //Code sychronisation if several call to the FB SDK is scheduled in different script
      var fbInitialized = false;
      var locale = Globals.locale;
      var toRender = {}; // List of items waiting for rendering
  
      var fbInitCallBack = function(){
          console.log('FB init');
          if (fbInitialized) { return; }
          fbInitialized = true;

          window.FB.init({
            xfbml      : true,
            version    : 'v2.3'
          });

          var settings = {onlike: onFBLike, ondislike: onFBDisLike, onrender: onFBRender},
          events = { onlike: 'edge.create', ondislike: 'edge.remove', onrender: 'xfbml.render'};

          for (var e in events) {
            if (typeof settings[e] === functionStr) {
              window.FB.Event.subscribe(events[e], settings[e]);
            }
          }
        },
        /*fbInitParam = {
          channelUrl: Globals.SOCIAL.FACEBOOK_CHANNEL, // Path to your Channel File
          xfbml: false
        },*/
        functionStr = 'function', divStr = 'div', aStr = 'a',
        fbRootStr = 'fb-root', facebookStr = 'facebook',
        dataHrefStr = 'data-href', clickStr = 'click', tweetStr = 'tweet', twitterStr = 'twitter',
        hrefStr = 'href', gplusStr = 'gplus',
        activatedStr = ' activated';

      //If window.fbAsyncInit not already set
      if (typeof window.fbAsyncInit !== functionStr){
        //Param for the FB SDK initialization
        window.fbAsyncInit = fbInitCallBack;
      }
      else{
        var tmpCallBack = window.fbAsyncInit;
        window.fbAsyncInit = function(){
          tmpCallBack();
          fbInitCallBack();
        };
      }

      var widgets = {
        'facebook': {
          //FACEBOOK - LIKE
          scriptSrc: '//connect.facebook.net/'+ (Globals.SOCIAL.LOCALES[locale] || 'en_US') + '/sdk.js',
          scriptID: 'facebook-jssdk',
          append: function(){
            var fb = document.getElementById(fbRootStr);
            if(!fb){
              fb = document.createElement(divStr);
              fb.id = fbRootStr;
              document.body.appendChild(fb);
            }
          },
          className: facebookStr,
          init: function(elt, options) {
            var el = document.createElement(divStr),
            hrefAttribute = options.url || (options.facebook && options.facebook.url),
            layout = 'button_count';

            el.className = 'fb-like';
            el.setAttribute('data-layout', layout);
            el.setAttribute('data-action', 'like');
            el.setAttribute('data-show-faces', false);
            el.setAttribute('data-share', false);
            
            console.log('Socialize::Facebook::init', options);
            
            if(hrefAttribute){
              el.setAttribute(dataHrefStr, hrefAttribute);
            }

            return el;
          },
          activate: function(elt){
            console.log('Socialize::Facebook:activate', elt);
            fbInitCallBack();
            
            /*
            * Dans le cas où il y a une SocialBar et une FollowBar sur la même page :
            * Comme ces composants testent la présence du script sdk du réseau, ils savent s'il est présent dans
            * la page ou non mais ne sont pas au courant s'il a fini de se charger ou pas, d'où problème
            * de rendu car l'appel est lancé sans que les méthodes soient dispo, du coup on passe par une variable 
            * globale qui va sauvegarder les éléments à afficher une fois le script sdk téléchargé
            * 
            */
            if (window.FB && window.FB.XFBML) {
              window.FB.XFBML.parse(elt);

              if(toRender && toRender[facebookStr]){
                for(var i=0; i<toRender[facebookStr].length; i++){
                  window.FB.XFBML.parse(toRender[facebookStr][i]);
                }
                toRender[facebookStr] = null;
              }
            }
            else{
              toRender[facebookStr] = toRender[facebookStr] || [];
              toRender[facebookStr].push(elt);
            }
          }
      },
      'twitter': {
        //TWITTER - SHARE
        scriptSrc: '//platform.twitter.com/widgets.js',
        scriptID: 'twitter-wjs',
        append: function(){
          var notwttr  = (typeof window.twttr !== 'object'),
          settings = {onclick: onTWClick, ontweet: onTWTweet},
          events   = [clickStr, tweetStr],
          bind = function(){
            for (var i = 0; i < events.length; i++) {
              var e = events[i];
              if (typeof settings['on' + e] === functionStr && twttr.events) {
                twttr.events.bind(e, settings['on' + e]);
              }
            }
          };
          if (notwttr) {
            var t;
            window.twttr = (t = { _e: [], ready: function(f) { t._e.push(f); } });
            window.twttr.ready(function(){
              bind();
            });
          } else {
            bind();
          }
          return notwttr;
        },
        className: twitterStr,
        init: function(elt, options) {
          var el = document.createElement(aStr),
          hrefAttribute = options.url || (options.twitter && options.twitter.url),
          txtAttribute = options.twitter && options.twitter.text,
          viaAttribute = options.twitter && options.twitter.via,
          locationURL = hrefAttribute ? hrefAttribute : location.href;

          el.className = 'twitter-share-button';
          el.setAttribute(hrefStr, 'https://twitter.com/share');
          el.setAttribute('data-lang', locale);
          el.setAttribute('data-count', true);

          if(txtAttribute){
            el.setAttribute('data-text', txtAttribute);
          }
          if(viaAttribute){
            el.setAttribute('data-via', viaAttribute);
          }

          el.setAttribute('data-url', locationURL);

          return el;
        },
        activate: function(elt) {
          if (twttr && twttr.widgets) {
           twttr.widgets.load(elt);
          }
        }
      },
      'gplus': {
        //GOOGLEPLUS - ONE
        scriptSrc: '//apis.google.com/js/plusone.js',
        scriptID: 'gplusone-js',
        append: function (/*network*/) {
          if (window.gapi) {
            return false;
          }
          window.___gcfg = {
            lang: Globals.SOCIAL.LOCALES[locale],
            parsetags: 'explicit'
          };
        },
        className: gplusStr,
        init: function(elt, options) {
          var elContainer = document.createElement(divStr),
          el = document.createElement(divStr),
          hrefAttribute = options.url || (options.gplus || options.gplus.url);

          elContainer.className = 'gplusoneContainer';
          el.className = 'g-plusone';
          el.setAttribute('data-size', 'medium');
          el.setAttribute('data-callback', 'onGPlusClick');
          if(hrefAttribute){
            el.setAttribute(dataHrefStr, hrefAttribute);
          }

          elContainer.appendChild(el);
          return el;
        },
        activate: function(elt)
          {
          /*
          * Dans le cas où il y a une SocialBar et une FollowBar sur la même page :
          * Comme ces composants testent la présence du script sdk du réseau, ils savent s'il est présent dans
          * la page ou non mais ne sont pas au courant s'il a fini de se charger ou pas, d'où problème
          * de rendu car l'appel est lancé sans que les méthodes soient dispo, du coup on passe par une variable 
          * globale qui va sauvegarder les éléments à afficher une fois le script sdk téléchargé
          * 
          */

          if (window.gapi && window.gapi.plusone) {
            gapi.plusone.go(elt);

            if(toRender && toRender[gplusStr]){
              for(var i=0; i<toRender[gplusStr].length; i++){
                gapi.plusone.go(toRender[gplusStr][i]);
              }
              toRender[gplusStr] = null;
            }
          } else{
            toRender[gplusStr] = toRender[gplusStr] || [];
            toRender[gplusStr].push(elt);
          }
        }
      }
    },
    rstate    = /^($|loaded|complete)/;

    var SocialBar = {
      toLoad: [],
      loadingNetwork: false,

      hasClass: function(el, cn) {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
      },
      getElements: function(context, cn) {
        // copy to a new array to avoid a live NodeList
        var i   = 0,
        el  = [],
        gcn = !!context.getElementsByClassName,
        all = gcn ? context.getElementsByClassName(cn) : context.getElementsByTagName('*');
        for (; i < all.length; i++) {
          if (gcn || SocialBar.hasClass(all[i], cn)) {
            el.push(all[i]);
          }
        }
        return el;
      },

      /**
      * Initiate social bar creation
      */
      createBar: function(node, options){
        console.log('OPTIONS', node, options);
        SocialBar.loadWidgets(node, 0, options);
      },

      loadWidgets: function(node, widgetIdx, options){
        if(widgetIdx >= node.children.length) {
          return;
        }

        var widgetNode = node.children[widgetIdx],
        networkName = widgetNode.className,
        network = widgets[networkName];

        if(!network){
          //				console.warn('no such network ' + networkName);
          //				alert('no such network ' + networkName);
          return;
        }

        console.log('loadWidgets OPTIONS', options);
        var element = network && network.init(widgetNode, options);

        if(element){
          widgetNode.appendChild(element);

          if(!network.toActivate){
            network.toActivate = [];
          }
          network.toActivate.push(widgetNode);
          SocialBar.loadNetworks(networkName, element);
        }

        SocialBar.loadWidgets(node, ++widgetIdx, options);
      },

      loadNextNetwork: function(){
        if(SocialBar.loadingNetwork){ return; }
        if(SocialBar.toLoad.length === 0){ return; }
        var network = SocialBar.toLoad.shift();

        SocialBar.loadingNetwork = true;

        var elt = document.createElement('script');
        elt.id = network.scriptID;
        elt.onload = elt.onreadystatechange = function() {
          if (rstate.test(elt.readyState || '')) {
            elt.onload = elt.onreadystatechange = null;
            network.loaded = true;
            network.loading = false;
            SocialBar.loadingNetwork = false;

            if (network.toActivate) {
              for(var i=0; i<network.toActivate.length; i++){
                if (network.activate) {
                  network.activate(network.toActivate[i]);
                }
                
                if(network.className !== facebookStr){
                  network.toActivate[i].className += activatedStr;
                }
              }

              if(network.className !== facebookStr){
                network.toActivate = null;
              }
            }

            SocialBar.loadNextNetwork();
          }
        };

        elt.src = network.scriptSrc;
        document.body.appendChild(elt);
      },

      loadNetworks: function (networkName, elt) {
        var network = widgets[networkName];

        if(network.append && !network.appended){
          network.append();
          network.appended = true;
        }

        if (network.scriptSrc) {
          var dom = document.getElementById(network.scriptID);

          if(dom){
            var _node = elt.parentNode;
            if(network.loaded){
              if(network.activate){
                // In this case the social network script provides an API and we don't have to reset the scripts
                network.activate(_node);
                if(network.className !== facebookStr){
                  _node.className += activatedStr;
                }
                return;
              } else {
                // Remove the network script before
                dom.parentNode.removeChild(dom);
                dom = null;
                network.loaded = false;
                // Fall through the other condition
              }
            } else if (!network.loading) {
              if(network.activate){
                network.loaded = true;
                network.activate(_node);
                if(network.className !== facebookStr){
                  _node.className += activatedStr;
                }
              }
            }
          }

          if (!dom && !network.loading){
            network.loading = true;
            SocialBar.toLoad.push(network);

            if(!SocialBar.loadingNetwork){
              SocialBar.loadNextNetwork();
            }
          }
        }
      }
    };

    function onFBRender(index){
      console.log('Socialize::onFBRender');
      
      if(!widgets[facebookStr].toActivate){
        widgets[facebookStr].toActivate = [1];
      }
      if(!widgets[facebookStr].toActivate[index - 1]){
        widgets[facebookStr].toActivate[index - 1] = 1;
      }

      widgets[facebookStr].toActivate[index-1].className += activatedStr;
    }

      // Events to send to GoogleAnalytics
    function onFBLike(url){
      //	console.warn('LIKE', arguments);

      onSocialEvent(facebookStr, 'like', url);
    }

    function onFBDisLike(url){
      //	console.warn('DISLIKE', arguments);

      onSocialEvent(facebookStr, 'dislike', url);
    }

    function getTWUrl(intentEvent){
      var optTarget = location.href;
      if (intentEvent) {
        if (intentEvent.target && intentEvent.target.nodeName === 'IFRAME') {
          var uri = intentEvent.target.src;
          if (uri) {
            var regex = new RegExp('[\\?&#]url=([^&#]*)'),
            params = regex.exec(uri);
            if (params !== null) {
              optTarget = unescape(params[1]);
            }
          }
        }
      }
      return optTarget;
    }

    function onTWClick(intentEvent){
      //	console.warn('TW Click', arguments, getTWUrl(intentEvent));

      onSocialEvent(twitterStr, clickStr, getTWUrl(intentEvent));
    }

    function onTWTweet(intentEvent){
      //	console.warn('TW Tweet', arguments, getTWUrl(intentEvent));

      onSocialEvent(twitterStr, tweetStr, getTWUrl(intentEvent));
    }

    var onSocialEvent = function () {};
  
    return {
      templateUrl: 'views/template/socialize.html',
      scope: {
        socializeOpened: '='
      },
      controller: function ($scope, $rootScope, $element, $location) {
        $scope.socialize = function () {
          console.warn('socialize', $location.path(), $element[0].children[0].children[1]);
          SocialBar.createBar($element[0].children[0].children[1], {url: SocializeFormatter.formatToLike()});
          $scope.active = true;
          $scope.socializeOpened = true;
          onSocialEvent = ($scope.onSocialEvent) || function(){};
        };
        
        if ($scope.socializeOpened) {
          $scope.socialize();
        }
      }
    };
  });
