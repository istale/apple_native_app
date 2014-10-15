
app.controller('ManageEventListCtrl', ['$scope', '$rootScope', '$ionicLoading', '$ionicViewService', '$http', 'UrlHelper', function ($scope, $rootScope, $ionicLoading, $ionicViewService, $http, UrlHelper) {

    $ionicViewService.clearHistory();

    var url = UrlHelper.prepareApiUrl("webapiEvents");

    $rootScope.events = [];
    $rootScope.slides = [];

    $http.get(url)
        .success(function (data, status, headers, config) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {

                $rootScope.events.push({
                    id: data[i].id,
                    bride: data[i].Bride,
                    groom: data[i].Groom,
                    thelocation: data[i].WeddingLocation,
                    thename: data[i].CeremonyName,
                    thetime: data[i].WeddingTime,
                    theurl: data[i].theurl
                });

            }
            $ionicLoading.hide();
        })
        .error(function (data, status, headers, config) { console.log("apiImage: ", data); });












}]);