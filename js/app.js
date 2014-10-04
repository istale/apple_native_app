'use strict';

var app = angular.module('app', [
  'ionic',
  'utility',
  'ngResource',
  'monospaced.elastic'
]);

app.value('$', $);

app.run(['$ionicPlatform', '$ionicLoading', '$rootScope', '$state', '$stateParams', '$timeout', '$window', 'SignalrService', 'User',
    function ($ionicPlatform, $ionicLoading, $rootScope, $state, $stateParams, $timeout, $window, SignalrService, User) {

        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        document.addEventListener("deviceready", function () {
            $rootScope.runningInCordova = true;
        }, false);


        try {
            User.isAuthenticated();
        } catch (e) {
            // do nothing with this error
        }

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // signalr initialize
        SignalrService.initialize();

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);

            // 跳轉每一個頁面時必定觸發 loading
            $ionicLoading.show({ template: 'Loading...' });
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error.name === 'AuthenticationRequired') {
                User.setNextState(toState.name, 'You must login to access this page');
                alert("Login error, pls check user/pass");
                $state.go('general.form_upload', {}, { reload: true });
            }
        });
    }])

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    //$locationProvider.html5Mode(true);

    $stateProvider
      // general function
      .state('general', {
          url: "/general",
          abstract: true,
          templateUrl: "general_sidemenu.html",
          controller: 'GeneralSideMenuCtrl'
      })
              .state('general.event_list', {
                  url: "/event_list",
                  views: {
                      'menuContent': {
                          templateUrl: "general_event_list.html",
                          controller: 'GeneralEventListCtrl'
                      }
                  }
              })
              .state('general.form_upload', {
                  url: "/form_upload",
                  views: {
                      'menuContent': {
                          templateUrl: "general_form_upload.html",
                          controller: 'GeneralFormUploadCtrl'
                      }
                  }
              })

      // manage function
      .state('manage', {
          url: "/manage",
          abstract: true,
          templateUrl: "manage_sidemenu.html",
          controller: 'ManageSideMenuCtrl',
          resolve: {
              user: 'User',
              authenticationRequired: ['user', function (user) {
                  user.isAuthenticated();
              }],
              resolved_events: ['$q', '$timeout', '$http', '$rootScope', 'UrlHelper', function ($q, $timeout, $http, $rootScope, UrlHelper) {

                  console.log('in resolved_events');

                  var deferred = $q.defer();

                  var events = [];

                  var url = UrlHelper.prepareApiUrl("webapiEvents");


                  $http.get(url)
                      .success(function (data, status, headers, config) {
                          console.log(data);
                          for (var i = 0; i < data.length; i++) {

                              events.push({
                                  id: data[i].id,
                                  bride: data[i].Bride,
                                  groom: data[i].Groom,
                                  thelocation: data[i].WeddingLocation,
                                  thename: data[i].CeremonyName,
                                  thetime: data[i].WeddingTime,
                                  theurl: data[i].theurl
                              });

                              if (i == data.length - 1) {
                                  deferred.resolve(events);
                              }
                          }

                      })
                      .error(function (data, status, headers, config) { console.log("apiImage: ", data); });

                  return deferred.promise;
              }]
          }
      })
              .state('manage.event_list', {
                  url: "/event_list",
                  views: {
                      'menuContent': {
                          templateUrl: "manage_event_list.html",
                          controller: 'ManageEventListCtrl'
                      }
                  }
              })
              .state('manage.slide_list', {
                  url: "/slide_list",
                  views: {
                      'menuContent': {
                          templateUrl: "manage_slide_list.html",
                          controller: 'ManageSlideListCtrl'
                      }
                  },
                  resolve: {
                      resolved_slides: ['$q', '$timeout', '$http', '$rootScope', 'UrlHelper', function ($q, $timeout, $http, $rootScope, UrlHelper) {

                          console.log('in resolved_slides');

                          var deferred = $q.defer();
                          var slides = [];
                          var url = UrlHelper.prepareApiUrl("webapiThumbnailImages/2017");
                          var thumbnail_rul = UrlHelper.prepareDataUrl("");

                          $http.get(url)
                          .success(function (data, status, headers, config) {
                              //console.log(data);
                              for (var i = 0; i < data.length; i++) {

                                  slides.push({
                                      slide_id: i + 1,
                                      image_id: data[i].id,
                                      image: thumbnail_rul + data[i].filePath,
                                      name: data[i].name,
                                      message: data[i].leaveMessage,
                                      ispublish: data[i].isPublish == 0 ? false : true,
                                      checked: true
                                  });

                                  if (i == data.length - 1) {
                                      deferred.resolve(slides);
                                  }
                              }

                          })
                          .error(function (data, status, headers, config) { console.log("apiImage: ", data); });

                          return deferred.promise;
                      }]
                  }
              })
              .state('manage.slide_detail', {
                  url: "/slide_list/{id}",
                  views: {
                      'menuContent': {
                          templateUrl: "manage_slide_detail.html",
                          controller: 'ManageSlideDetailCtrl'
                      }
                  }
              });

    $urlRouterProvider.otherwise('/general/form_upload');

    // http://stackoverflow.com/questions/20305615/configure-angularjs-module-to-send-patch-request
    // add http header for $http.patch
    $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json;charset=utf-8'
    }
}]);

