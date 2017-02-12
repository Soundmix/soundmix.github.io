var config = {
  forbiddenResources : [
    'https://www.youtube.com',
    'www.google-analytics.com',
    '.css',
    'pagead2.googlesyndication.com'
  ],
  urlToReplace: {
//    'rec.copernic.orange.com/jsplugin/ritmic': 'localhost/jsplugin/ritmic',
//    'rec.copernic.orange.com/api': '172.16.4.72:9002/backend/rest'
  },
  port: 8000,
//  internalServicePath: 'http://127.0.0.1/',
  internalServicePath: '%PHANTOM_INTERNAL_SERVICE%',
  monitorTimeout: 5000
};

module.exports = config;