﻿
app.service('SignalrService', ['$', '$rootScope', '$state', 'config', 'UrlHelper', function ($, $rootScope, $state, config, UrlHelper) {
    var proxy = null;

    var initialize = function () {

        console.log('begin of signalRSvc intialize');

        // Getting the connection object
        var url = UrlHelper.prepareSignalrUrl();
        var connection = $.hubConnection(url, { useDefaultPath: false });

        // Creating proxy, 開頭字母要小寫
        proxy = connection.createHubProxy('apiSlidesHub');

        // 監聽server傳過來的事件
        //proxy.on('hello', function (theString) { });

        //proxy.on('newSlideToManager', function (id, filePath, name, leaveMessage, isPublish) {
        //    console.log("newSlideToManager:");

        //    var thumbnail_rul = UrlHelper.prepareDataUrl("");
        //    var data = {
        //        id: id,
        //        image: thumbnail_rul + filePath,
        //        name: name,
        //        message: leaveMessage,
        //        ispublish: isPublish == 0 ? false : true
        //    };

        //    console.log(data);

        //    $rootScope.$broadcast("client_newSlideToManager", data);
        //});

        proxy.on('groupNewSlideToManager', function (id, filePath, name, leaveMessage, isPublish) {
            console.log("groupNewSlideToManager:");

            var thumbnail_rul = UrlHelper.prepareDataUrl("");
            var data = {
                id: id,
                image: thumbnail_rul + filePath,
                name: name,
                message: leaveMessage,
                ispublish: isPublish == 0 ? false : true
            };

            console.log(data);

            $rootScope.$broadcast("client_newSlideToManager", data);
        });

        // 註冊 signalR 連線
        connection.start()
                  .done(function () {
                      console.log('Now connected, connection ID=' + connection.id);
                      //proxy.server.joinGroup(groupName);
                      proxy.invoke('joinGroup', '2018').done(function () {
                          console.log('Invocation of joinGroup succeeded');
                      }).fail(function (error) {
                          console.log('Invocation of joinGroup failed. Error: ' + error);
                      });
                  })
                  .fail(function (error) { console.log(error); });

    };

    // 呼叫 server 上的 clients.xxx 方法
    var invoke_server_method = function (s) {
        proxy.invoke(s);
    };

    return {
        initialize: initialize,
        proxy: proxy,
        invoke_server_method: invoke_server_method
    };
}]);
