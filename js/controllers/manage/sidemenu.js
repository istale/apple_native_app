
app.controller('ManageSideMenuCtrl', ['$scope', '$ionicViewService', '$state', '$rootScope', 'User', 'PushProcessingService', function ($scope, $ionicViewService, $state, $rootScope, User, PushProcessingService) {

    // external login後導向這邊，底下clearHistory以避免back button出現
    $ionicViewService.clearHistory();

    //console.log('in ManageSideMenuCtrl');
    //console.log(resolved_slides);

    // 這樣的寫法可以讓 子state 繼承 events
    //$scope.events = resolved_events;

    // 這樣的寫法 不 可以讓 子state 繼承 slides
    // $scope.slides = [];

    $scope.logout = function () {
        User.removeAuthentication();
        $rootScope.events = [];
        $state.go('general.form_upload');
    };

    //PushProcessingService.manual_initialize();

}]);