

app.service('SlidesService', ['$http', '$q', 'UrlHelper', '$window', 'SignalrService', function ($http, $q, UrlHelper, $window, SignalrService) {

    // private property
    var slides = [];

    // setter / getter
    function getAll() {

        var savedData = JSON.parse($window.localStorage.getItem('auth_data'));
        if (savedData)
            return slides;
        else
            httpGetAll();
    }

    // persist data in client
    $window.localStorage.setItem('auth_data', JSON.stringify(userData));
    var savedData = JSON.parse($window.localStorage.getItem('auth_data'));
    $window.localStorage.removeItem('auth_data');

    // restful manipulate
    function httpGetAll() {

    }


    // realtime method ex. signalr, push notification
    SignalrService.proxy.on('newSlideToManager', function (id, filePath, name, leaveMessage, isPublish) {
        console.log("newSlideToManager:");

        var data = {
            id: id,
            image: filePath,
            name: name,
            message: leaveMessage,
            ispublish: isPublish == 0 ? false : true
        };

        console.log(data);

        $rootScope.$broadcast("client_newSlideToManager", data);
    });










    //var url = UrlHelper.prepareApiUrl("webapiImages/2014");
    //var dataInMemory = $http.get(url).then(function (resp) {
    //    console.log(resp);
    //    return resp.data;
    //});

    //return {

    //    all: function () {
    //        return dataInMemory;
    //    },

    //    getAll: function () {
    //        var deferred = $q.defer();
    //        var url = utils.prepareApiUrl('angtest');

    //        $http.get(url)
    //            .success(function (data, status, headers, config) {
    //                dataInMemory = data;
    //                return deferred.resolve(data);
    //            })
    //            .error(function (data, status, headers, config) {
    //                return deferred.reject(data);
    //            });

    //        return deferred.promise;
    //    },

    //    getOne: function (id) {
    //        var deferred = $q.defer();
    //        var temp_url = 'angtest/' + id;
    //        var url = utils.prepareApiUrl(temp_url);
    //        console.log(url);
    //        $http.get(url)
    //            .success(function (data, status, headers, config) {
    //                return deferred.resolve(data);
    //            })
    //            .error(function (data, status, headers, config) {
    //                return deferred.reject(data);
    //            });

    //        return deferred.promise;
    //    },

    //    create: function (newModel) {
    //        var deferred = $q.defer();
    //        var url = utils.prepareApiUrl('angtest');

    //        $http.post(url, newModel, function (model) {
    //            if (model == 'create_fail') {
    //                return deferred.reject('create_fail');
    //            }
    //            else {
    //                return deferred.resolve(model);
    //            }
    //        });

    //        return deferred.promise;
    //    },

    //    update: function (user) {
    //        var deferred = $q.defer();
    //        var url = utils.prepareApiUrl('angtest');

    //        $http.put(url, user, function (model) {
    //            if (model == 'update_fail') {
    //                return deferred.reject('update_fail');
    //            }
    //            else {
    //                return deferred.resolve(model);
    //            }
    //        });
    //        return deferred.promise;
    //    },

    //    delete: function (id) {
    //        var deferred = $q.defer();
    //        var temp_url = 'angtest/' + id;
    //        var url = utils.prepareApiUrl(temp_url);

    //        $http.delete(url, function (data) {
    //            if (data == 'delete_fail') {
    //                return deferred.reject('delete_fail');
    //            } else {
    //                return deferred.resolve('delete_success');
    //            }
    //        });
    //        return deferred.promise;
    //    }


    //};
}]);