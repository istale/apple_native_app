

app.service('SlidesService', ['$http', '$q', 'UrlHelper', function ($http, $q, UrlHelper) {

    // private property
    var slides = [];

    // setter / getter
    function getAll() {
        return slides;
    }

    // persist data in client

    // restful manipulate
    function httpGetAll() {

    }


    // realtime method ex. signalr, push notification

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