!function(a,b){!function(){var a={API_PATH:"http://preprod.copernic.orange.com/api",AUTH_API_PATH:"https://preprod.identity.ohdevelopers.orange.com/openam"};window.OrangeIdentitySDKConfig=a}();var c={};!function(a){var b={},c=-1;a.publish=function(a,c){if(!b[a])return!1;for(var d=b[a],e=d?d.length:0;e--;)d[e].func(a,c);return!0},a.subscribe=function(a,d){b[a]||(b[a]=[]);var e=(++c).toString();return b[a].push({token:e,func:d}),e},a.unsubscribe=function(a){for(var c in b)if(b[c])for(var d=0,e=b[c].length;e>d;d++)if(b[c][d].token===a)return b[c].splice(d,1),a;return!1}}(c);var d={};!function(a){a.connect=function(a,b,c,d,e,f){var g="undefined"!=typeof XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");if(g.withCredentials=!0,g.open(b,a),"POST"!==b&&"PUT"!==b||g.setRequestHeader("Content-Type","application/json"),f)for(var h=0;h<f.length;h++)g.setRequestHeader(f[h].header,f[h].value);g.onreadystatechange=function(){var a,b;if(4===g.readyState)if(a=g.status,200==a)""!==g.responseText&&(b=JSON.parse(g.responseText)),d&&d(b);else{if(""!==g.responseText)try{b=JSON.parse(g.responseText)}catch(c){b=g.responseText}e&&e(a,b)}};try{"POST"===b||"PUT"===b?g.send(JSON.stringify(c)):g.send()}catch(i){}}}(d);var e={};!function(a){var b,e,f,g,h=[{header:"X-Requested-With",value:"XMLHttpRequest"}];a.init=function(){b=OrangeIdentitySDKConfig.AUTH_API_PATH,e=OrangeIdentitySDKConfig.REALM,f=OrangeIdentitySDKConfig.API_PATH,g="orange.com"===a._getDomain()?"iPlanetDirectoryPro":"token"},a._getDomain=function(){if(OrangeIdentitySDKConfig.COOKIE_DOMAIN)return OrangeIdentitySDKConfig.COOKIE_DOMAIN;var a=window.location.host.split(".");return a.slice(a.length-2,a.length).join(".")},a._readToken=function(){for(var a=g+"=",b=document.cookie.split(";"),c=0;c<b.length;c++){for(var d=b[c];" "==d.charAt(0);)d=d.substring(1,d.length);if(0===d.indexOf(a))return d.substring(a.length,d.length)}return null},a._setToken=function(b,c){var d=new Date;d.setTime(d.getTime()+2592e6),document.cookie=g+"="+c+";domain=."+a._getDomain()+";path=/;expires="+d.toUTCString()},a._deleteToken=function(b){document.cookie=g+"=; expires=Thu, 18 Dec 2013 12:00:00 UTC; domain=."+a._getDomain()+";path=/;"},a.usePersistentCookie=function(){d.connect(b+"/json/authenticate?realm=%2F"+e+"&service=Rememberme&authIndexType=service&authIndexValue=Rememberme","POST",{},function(b){b&&b.tokenId?(a._setToken("iPlanetDirectoryPro",b.tokenId),a.isAuthenticated(!0)):c.publish("user/isDisconnected")},function(a,b){c.publish("user/isDisconnected")},h)},a.getprofile=function(e,f,g){f?d.connect(b+"/json"+e+"/users/"+f,"GET",null,function(b){var d={username:b.username,givenname:b.givenName,surname:b.sn,displayName:b.cn,email:b.mail,phoneNumber:b.telephoneNumber,memberOf:b.memberOf};b.avatar&&(d.avatar=b.avatar),a.renewCopernicSession(function(){c.publish("user/isConnected",d)})},function(a,b){c.publish("user/unknownError")},g):a.usePersistentCookie()},a.isAuthenticated=function(e){var f=a._readToken("iPlanetDirectoryPro");f?d.connect(b+"/json/sessions/"+f+"?_action=validate","POST",{},function(b){var c=null,d=null;b.valid===!0?(c=b.uid,d=b.realm):a._deleteToken("iPlanetDirectoryPro");var e=[{header:"iPlanetDirectoryPro",value:f}];a.getprofile(d,c,e)},function(b,d){c.publish("user/unknownError"),a._deleteToken("iPlanetDirectoryPro"),e||a.usePersistentCookie()},h):d.connect(b+"/json/users?_action=idFromSession","POST",{},function(b){var c=null,d=null;b.id&&(c=b.id,d=b.realm);var e=[];a.getprofile(d,c,e)},function(b,c){e||a.usePersistentCookie()},h)},a.login=function(f,g,i){var j=b+"/json/authenticate?realm=%2F"+e;i&&(j+="&service=Rememberme&authIndexType=service&authIndexValue=Rememberme"),d.connect(j,"POST",{},function(i){if(i)if(i.authId){var j=i.authId,k={authId:j,stage:"DataStore1",callbacks:[{type:"NameCallback",input:[{name:"IDToken1",value:f}]},{type:"PasswordCallback",input:[{name:"IDToken2",value:g}]}]};d.connect(b+"/json/authenticate?realm=%2F"+e,"POST",k,function(b){b&&(a._setToken("iPlanetDirectoryPro",b.tokenId),a.isAuthenticated())},function(a,b){c.publish("user/wrongPasswordError")},h)}else a.logout()},function(a,b){c.publish("user/wrongPasswordError")},h)},a.signup=function(a,f,g){d.connect(b+"/json/"+e+"/users?_action=register","POST",{email:a,subject:f,message:g},function(a){c.publish("user/signupSuccessful")},function(a,b){b&&b.error&&32==b.error.code?c.publish("user/identityAlreadyUsedError"):c.publish("user/unknownError")})},a.resetPassword=function(a,f,g){d.connect(b+"/json/"+e+"/users/?_action=forgotPassword","POST",{username:a,subject:f,message:g},function(a){c.publish("user/resetPasswordSuccessful")},function(a,b){b&&b.error&&26==b.error.code?c.publish("user/identityNotFoundError"):c.publish("user/unknownError")})},a.updateIdentity=function(a){var f={};a.givenname&&(f.givenName=[a.givenname]),a.surname&&(f.sn=[a.surname]),a.email&&(f.mail=[a.email]),a.surname&&(f.cn=[a.givenname+" "+a.surname]),a.phoneNumber&&(f.telephoneNumber=[a.phoneNumber]),d.connect(b+"/json/"+e+"/users/"+a.id,"PUT",f,function(a){var b={username:a.username,givenname:a.givenName,surname:a.sn,displayName:a.cn,email:a.mail,phoneNumber:a.telephoneNumber,memberOf:a.memberOf};a.avatar&&(b.avatar=a.avatar),c.publish("user/updateSuccessful",b)},function(a,b){b&&b.error&&26==b.error.code?c.publish("user/identityNotFoundError"):c.publish("user/unknownError")})},a.logout=function(){var f=a._readToken("iPlanetDirectoryPro");f?d.connect(b+"/json/sessions/"+f+"?_action=validate","POST",{},function(g){if(g.valid===!0){var h=[{header:"iPlanetDirectoryPro",value:f}];d.connect(b+"/json/sessions/?_action=logout&realm=%2F"+e,"POST",{},function(b){"Successfully logged out"==b.result&&(f=null,a.renewCopernicSession(function(){a.isAuthenticated()}))},function(a,b){},h)}else c.publish("user/isDisconnected")},function(a,b){},h):d.connect(b+"/json/sessions?_action=logout&realm=%2F"+e,"POST",{},function(b){"Successfully logged out"==b.result&&a.renewCopernicSession(function(){a.isAuthenticated()})},function(a,b){},h)},a.renewCopernicSession=function(b){var e=a._readToken("iPlanetDirectoryPro"),g=[];e&&g.push({header:"iPlanetDirectoryPro",value:e}),d.connect(f+"/user/renewSession","GET",null,function(){d.connect(f+"/user/get","GET",null,function(a){b&&b()},function(a,b){c.publish("user/unknownError")},g)},function(a,b){c.publish("user/unknownError")},g)}}(e),function(){window.location.href.indexOf("success=")>=0&&(e.isAuthenticated(),window.close());var a,b={pubsub:c,init:function(){e.init.apply(null,arguments)},login:function(){e.login.apply(null,arguments)},logout:function(){e.logout.apply(null,arguments)},resetPassword:function(){e.resetPassword.apply(null,arguments)},updateIdentity:function(){e.updateIdentity.apply(null,arguments)},signup:function(){e.signup.apply(null,arguments)},isAuthenticated:function(){e.isAuthenticated.apply(null,arguments)},getSocialLoginURL:function(a,b){return OrangeIdentitySDKConfig.AUTH_API_PATH+"/UI/Login?realm="+OrangeIdentitySDKConfig.REALM+"&service="+a+"SocialAuthenticationService&goto="+b},loginWith:function(c,d){d=encodeURIComponent(d.split("#!")[0]+"?success=true");var f=b.getSocialLoginURL(c,d);a=window.open(f,"socialAPI","width=875,height=483,resizable=1,scrollbars=1,location=1,toolbar=0");var g=setInterval(function(){a.closed&&(clearInterval(g),e.isAuthenticated())},250)}};window.OrangeIdentity=b}(),b["true"]=a}({},function(){return this}());
//# sourceMappingURL=orangeIdentitySDK.js.map