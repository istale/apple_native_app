

angular.module('utility.config', [])

.service('config', function () {

    return {
        // Url結尾不要有/
        //siteUrl: 'http://icdt-dev-apple.azurewebsites.net',
        //apiUrl: 'http://icdt-dev-apple.azurewebsites.net/api',
        //signalrUrl: 'http://icdt-dev-apple.azurewebsites.net/signalr'

        //siteUrl: 'http://localhost:49163',
        //apiUrl: 'http://localhost:49163/api',
        //signalrUrl: 'http://localhost:49163/signalr'

        siteUrl: '',
        tokenUrl: 'http://icdt-dev-apple-webapi.azurewebsites.net',
        apiUrl: 'http://icdt-dev-apple-webapi.azurewebsites.net/api',
        signalrUrl: 'http://icdt-dev-apple.azurewebsites.net/signalr'


        //siteUrl: 'http://localhost:52214',
        //apiUrl: 'http://localhost:52214/api',
        //signalrUrl: 'http://localhost:52214/signalr'
    };

});