
app.controller('ManageSlideListCtrl', ['$scope', '$ionicLoading', '$ionicViewService', '$http', '$rootScope', 'UrlHelper', 'resolved_slides', function ($scope, $ionicLoading, $ionicViewService, $http, $rootScope, UrlHelper, resolved_slides) {

    console.log('in SlideListCtrl');

    $ionicViewService.clearHistory();

    // 使用rootScope簡化邏輯流程
    $rootScope.slides = resolved_slides;
    console.log($rootScope.slides);

    $scope.$parent.$on("client_newSlideToManager", function (e, data) {
       
        console.log("client_newSlideToManager:");
        console.log(data);

        var newSlideIndex = $scope.slides.length + 1;

        $scope.slides.push({
            slide_id: newSlideIndex,
            image_id: data.id,
            image: data.image,
            name: data.name,
            message: data.message,
            ispublish: data.ispublish
        });
        $scope.$parent.$apply();
        console.log($scope.slides);
    });

    $scope.slideIsPublishChange = function (slide_id) {

        var slide = $scope.slides[ slide_id - 1 ];

        var update_obj = {
            Id: slide.image_id,
            IsPublish: slide.ispublish == true ? "1" : "0"
        };

        var url = UrlHelper.prepareApiUrl("webapiImages/2016/" + slide.image_id);

        // angular no shortcut method for PATCH
        $http({ method: 'PATCH', url: url, data: update_obj }).
             success(function (data, status, headers, config) {
                 console.log('in success');
                 console.log('data: ', data);
                 console.log('status: ', status);
                 console.log('headers: ', headers);
                 console.log('config: ', config);
             }).
             error(function (data, status, headers, config) {
                 console.log('in error');
                 console.log('data: ', data);
                 console.log('status: ', status);
                 console.log('headers: ', headers);
                 console.log('config: ', config);
             });

    };

    $scope.getItemHeight = function () {
        return 143;
    };

   

    $ionicLoading.hide();

}]);