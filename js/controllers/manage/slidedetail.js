
app.controller('ManageSlideDetailCtrl', ['$scope', '$stateParams', '$ionicLoading', function ($scope, $stateParams, $ionicLoading) {

    console.log($stateParams);

    var id = $stateParams.id - 1;
    console.log($scope.slides[id]);
    $scope.single_slide = $scope.slides[id];

    $ionicLoading.hide();

}]);