

angular.module('utility.config', [])

.service('config', function () {

    return {
        // Url結尾不要有/
        //siteUrl: 'http://icdt-dev-apple.azurewebsites.net',
        //apiUrl: 'http://icdt-dev-apple.azurewebsites.net/api',
        //signalrUrl: 'http://icdt-dev-apple.azurewebsites.net/signalr'

        //siteUrl: 'http://localhost:49420',
        //tokenUrl: 'http://localhost:49420',
        //apiUrl: 'http://localhost:49420/api',
        //signalrUrl: 'http://localhost:49420/signalr'

        siteUrl: 'http://icdt-dev-apple-webapi.azurewebsites.net'
        //siteUrl: 'http://localhost:49420'


        //siteUrl: '',
        //tokenUrl: 'http://icdt-dev-apple-webapi.azurewebsites.net',
        //apiUrl: 'http://icdt-dev-apple-webapi.azurewebsites.net/api',
        //signalrUrl: 'http://icdt-dev-apple.azurewebsites.net/signalr'

        //siteUrl: 'http://localhost:52214',
        //apiUrl: 'http://localhost:52214/api',
        //signalrUrl: 'http://localhost:52214/signalr'

    //    siteUrl: 'http://localhost:52214',
    //    apiUrl: 'http://localhost:49420/api',
    //signalrUrl: 'http://localhost:49420/signalr'

        //siteUrl: 'http://icdt-dev-apple.azurewebsites.net',
        //tokenUrl: 'http://207.46.149.15:',
        //apiUrl: 'http://207.46.149.15/api',
        //signalrUrl: '/signalr'

    };

});