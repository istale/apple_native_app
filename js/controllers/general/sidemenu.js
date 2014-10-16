

app.controller('GeneralSideMenuCtrl', ['$scope', '$state', 'User', '$ionicLoading', function ($scope, $state, User, $ionicLoading) {

    var username = '',
        password = '',
        persist = false;

    //$scope.username = '';
    //$scope.password = '';
    //$scope.persist = false;
    $scope.errors = [];

    var nextState = null;

    try {
        nextState = User.getNextState();
    } catch (e) {
        nextState = null;
    }

    if(nextState !== null) {
        var nameBuffer = nextState.name + '';
        var errorBuffer = nextState.error + '';
        User.clearNextState();
        nextState = {
            name: nameBuffer,
            error: errorBuffer
        };
        if (typeof nextState.error === 'string' && nextState.error !== '' && $scope.errors.indexOf(nextState.error) === -1) {
            $scope.errors.push(nextState.error);
        } else {
            $scope.errors.push('You must be logged in to view this page');
        }
    }

    function disableLoginButton(message) {
        if (typeof message !== 'string') {
            message = 'Attempting login...';
        }
        jQuery('#login-form-submit-button').prop('disabled', true).prop('value', message);
    }

    function enableLoginButton(message) {
        if (typeof message !== 'string') {
            message = 'Submit';
        }
        jQuery('#login-form-submit-button').prop('disabled', false).prop('value', message);
    }

    function onSuccessfulLogin() {
        if(nextState !== null && typeof nextState.name === 'string' && nextState.name !== '') {
            $state.go(nextState.name, nextState.params);
        } else {
            $state.go('manage.event_list');      // sucessful login will go to this state
        }
    }

    function onFailedLogin(error) {
        if (typeof error === 'string' && $scope.errors.indexOf(error) === -1) {
            $scope.errors.push(error);
        }
        $ionicLoading.hide();
        enableLoginButton();
    }


    console.log( User.getUserData() );
    if ( User.getUserData().isAuthenticated == true ) {

        $state.go('manage.event_list');
    }

    var login = function () {
        console.log($scope.vm.username);
        console.log($scope.vm.password);
        console.log($scope.vm.persist);

        disableLoginButton();
        $ionicLoading.show();
        User.authenticate($scope.vm.username, $scope.vm.password, onSuccessfulLogin, onFailedLogin, $scope.vm.persist);
    };

    $scope.vm = {
        username: username,
        password: password,
        persist: persist,
        login: login
    };


}]);
