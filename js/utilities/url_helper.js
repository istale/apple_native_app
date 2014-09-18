

angular.module('utility.UrlHelper', ['utility.config'])

.service('UrlHelper', ['config', function (config) {

    return {
        prepareSiteUrl: function (uriSegments) {
            return config.siteUrl + '/' + uriSegments;
        },
        prepareApiUrl: function (uriSegments) {
            return config.apiUrl + '/' + uriSegments;
        },
        prepareTokenUrl: function (uriSegments) {
            return config.tokenUrl + '/' + uriSegments;
        }
    };

}]);