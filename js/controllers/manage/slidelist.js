
app.controller('ManageSlideListCtrl', ['$scope', '$ionicLoading', '$ionicViewService', '$http', '$rootScope', 'UrlHelper', '$stateParams', function ($scope, $ionicLoading, $ionicViewService, $http, $rootScope, UrlHelper, $stateParams) {

    console.log('in SlideListCtrl');

    $ionicViewService.clearHistory();
    debugger;
    // 如果有slides就不更新
    if ($rootScope.slides.length == 0) {
        var url = UrlHelper.prepareApiUrl("webapiThumbnailImages/" + $stateParams.event_url); //localhost test
        var thumbnail_url = UrlHelper.prepareDataUrl("");

        $http.get(url)
        .success(function (data, status, headers, config) {
            //console.log(data);
            for (var i = 0; i < data.length; i++) {

                $rootScope.slides.push({
                    slide_id: i + 1,
                    image_id: data[i].id,
                    image: thumbnail_url + data[i].filePath,
                    name: data[i].name,
                    message: data[i].leaveMessage,
                    ispublish: data[i].isPublish == 0 ? false : true,
                    checked: true
                });

            }
            $ionicLoading.hide();
        })
        .error(function (data, status, headers, config) { console.log("apiImage: ", data); });
    } else {
        $ionicLoading.hide();
    }
    
    // pull to refresh slides list
    $scope.doRefresh = function () {

        var url = UrlHelper.prepareApiUrl("webapiThumbnailImages/2016");
        var thumbnail_url = UrlHelper.prepareDataUrl("");

        $http.get(url)
        .success(function (data, status, headers, config) {
            console.log('doRefresh');
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var isSlideExist = 0;
                for (var j = 0; j < $scope.slides.length; j++) {
                    if (data[i].id == $scope.slides[j].image_id) {
                        console.log('data.id:', data[i].id);
                        console.log('slides.image_id:', $scope.slides[j].image_id);
                        isSlideExist = 1;
                    }

                    if ((j == $scope.slides.length - 1) && (isSlideExist == 0)) {

                        console.log('isSlideExist: ', isSlideExist);

                        var newSlideIndex = $scope.slides.length + 1;
                        $scope.slides.push({
                            slide_id: newSlideIndex,
                            image_id: data[i].id,
                            image: thumbnail_url + data[i].filePath,
                            name: data[i].name,
                            message: data[i].leaveMessage,
                            ispublish: data[i].isPublish == 0 ? false : true
                        });
                    }

                }
            }
            //$scope.$parent.$apply();
            console.log($scope.slides);
            $scope.$broadcast('scroll.refreshComplete');
        })
        .error(function (data, status, headers, config) { console.log("apiImage: ", data); });


    };

    // infinite scroll
    $scope.imageShown = 6;
    $scope.loadMore = function () {
        if ($scope.imageShown + 10 >= $scope.slides.length) {
            //$scope.$apply(function () {
            $scope.imageShown = $scope.slides.length;
            //});

        } else {
            //$scope.$apply(function () {
            $scope.imageShown = $scope.imageShown + 10;
            //});
        }
    };
    $scope.moreDataCanBeLoaded = function () {
        if ($scope.imageShown == $scope.slides.length) {
            return false;
        }
        return true;
    };

    // signalR 
    $scope.newImageCount = 0;
    $scope.$parent.$on("client_newSlideToManager", function (e, data) {
       
        console.log("client_newSlideToManager:");
        console.log(data);

        $scope.$apply(function () {
            $scope.newImageCount = $scope.newImageCount + 1;
        });

        //var newSlideIndex = $scope.slides.length + 1;

        //$scope.slides.push({
        //    slide_id: newSlideIndex,
        //    image_id: data.id,
        //    image: data.image,
        //    name: data.name,
        //    message: data.message,
        //    ispublish: data.ispublish
        //});
        //$scope.$parent.$apply();
        //console.log($scope.slides);
    });

    // 更新slides.ispublish
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

    

    // 顯示全部或未發布的slides
    $scope.filterOption = {
        ispublish: ''
    };
    $scope.showOption = 1;
    $scope.updateFilter = function (option) {
        console.log('updateFilter');

        if (option == 1) {
            $scope.filterOption.ispublish = '';
            $scope.showOption = 1;
        }else if(option==2){
            $scope.filterOption.ispublish = false;
            $scope.showOption = 2;
        }
        
    };

    // row height
    $scope.getItemHeight = function () {
        return 143;
    };

}]);