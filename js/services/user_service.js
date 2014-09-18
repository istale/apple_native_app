'use strict';

app.service('User', ['$http', '$window', 'UrlHelper', function ($http, $window, UrlHelper) {
    function NoAuthenticationException(message) {
      this.name = 'AuthenticationRequired';
      this.message = message;
    }

    function NextStateUndefinedException(message) {
      this.name = 'NextStateUndefined';
      this.message = message;
    }

    function AuthenticationExpiredException(message) {
      this.name = 'AuthenticationExpired';
      this.message = message;
    }

    function AuthenticationRetrievalException(message) {
      this.name = 'AuthenticationRetrieval';
      this.message = message;
    }

    var userData = {
      isAuthenticated: false,
      username: '',
      bearerToken: '',
      expirationDate: null,
    };

    var nextState = {
      name: '',
      error: ''
    };

    function isAuthenticationExpired(expirationDate) {
      var now = new Date();
      expirationDate = new Date(expirationDate);
      if (expirationDate - now > 0) {
        return false;
      } else {
        return true;
      }
    }

    function saveData() {
      removeData();
      $window.localStorage.setItem('auth_data', JSON.stringify(userData));
    }

    function removeData() {
        $window.localStorage.removeItem('auth_data');
    }

    function retrieveSavedData() {
        var savedData = $window.localStorage.getItem('auth_data');
      if (typeof savedData === 'undefined') {
        throw new AuthenticationRetrievalException('No authentication data exists');
      } else if (isAuthenticationExpired(savedData.expirationDate)) {
        throw new AuthenticationExpiredException('Authentication token has already expired');
      } else {
        userData = JSON.parse(savedData);
        setHttpAuthHeader();
      }
    }

    function clearUserData() {
      userData.isAuthenticated = false;
      userData.username = '';
      userData.bearerToken = '';
      userData.expirationDate = null;
    }

    function setHttpAuthHeader() {
      $http.defaults.headers.common.Authorization = 'Bearer ' + userData.bearerToken;
    }

    this.isAuthenticated = function() {
      if (userData.isAuthenticated && !isAuthenticationExpired(userData.expirationDate)) {
        return true;
      } else {
        try {
          retrieveSavedData();
        } catch (e) {
          throw new NoAuthenticationException('Authentication not found');
        }
        return true;
      }
    };

    this.getNextState = function() {
      if (nextState.name === '') {
        throw new NextStateUndefinedException('No state data was set');
      } else {
        return nextState;
      }
    };

    this.setNextState = function(name, error) {
      nextState.name = name;
      nextState.error = error;
    };

    this.clearNextState = function() {
      nextState.name = '';
      nextState.error = '';
    };

    this.getUserData = function(){
      return userData;
    };

    this.removeAuthentication = function() {
      removeData();
      clearUserData();
      $http.defaults.headers.common.Authorization = null;
    };

    this.authenticate = function (username, password, successCallback, errorCallback, persistData) {

      var url = UrlHelper.prepareTokenUrl('token');

      this.removeAuthentication();
      var config = {
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: 'grant_type=password&username=' + username + '&password=' + password,
      };
      console.log(config);
      $http(config)
        .success(function(data) {
          userData.isAuthenticated = true;
          userData.username = data.userName;
          userData.bearerToken = data.access_token;
          userData.expirationDate = new Date(data['.expires']);
          setHttpAuthHeader();
          if (persistData === true) {
            saveData();
          }
          if (typeof successCallback === 'function') {
            successCallback();
          }
        })
        .error(function(data) {
          if (typeof errorCallback === 'function') {
            if (data.error_description) {
              errorCallback(data.error_description);
            } else {
              errorCallback('Unable to contact server; please, try again later.');
            }
          }
        });
    };
  }]);
