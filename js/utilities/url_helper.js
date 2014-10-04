

angular.module('utility.UrlHelper', ['utility.config'])

.service('UrlHelper', ['config', function (config) {

    return {
        prepareSiteUrl: function (uriSegments) {
            return config.siteUrl + '/' + uriSegments;
        },
        prepareDataUrl: function (uriSegments) {
            return config.siteUrl + '/' + uriSegments;
        },
        prepareApiUrl: function (uriSegments) {
            return config.siteUrl + '/api/' + uriSegments;
        },
        prepareTokenUrl: function (uriSegments) {
            return config.siteUrl + '/token';
        },
        prepareSignalrUrl: function (uriSegments) {
            return config.siteUrl + '/signalr';
        },
    };

}]);