
app.service('SignalrService', ['$', '$rootScope', '$state', 'config', function ($, $rootScope, $state, config) {
    var proxy = null;

    var initialize = function () {

        console.log('begin of signalRSvc intialize');

        // Getting the connection object
        var url = config.signalrUrl;
        var connection = $.hubConnection(url);

        // Creating proxy, 開頭字母要小寫
        proxy = connection.createHubProxy('slidesHub');

        // 監聽server傳過來的事件
        proxy.on('hello', function (theString) { });

        proxy.on('newSlideToManager', function (id, filePath, name, leaveMessage, isPublish) {
            console.log("newSlideToManager:");

            var data = {
                id: id,
                image: filePath,
                name: name,
                message: leaveMessage,
                ispublish: isPublish == 0 ? false : true
            };

            console.log(data);

            $rootScope.$broadcast("client_newSlideToManager", data);
        });

        // 註冊 signalR 連線
        connection.start()
                  .done(function () { console.log('Now connected, connection ID=' + connection.id); })
                  .fail(function () { console.log('Could not connect'); });

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
