
app.controller('ManageSlideDetailCtrl', ['$scope', '$rootScope', '$stateParams', '$ionicLoading', function ($scope, $rootScope, $stateParams, $ionicLoading) {

    console.log($stateParams);

    var id = $stateParams.id - 1;
    console.log($rootScope.slides[id]);
    $scope.single_slide = $rootScope.slides[id];

    $ionicLoading.hide();

}]);