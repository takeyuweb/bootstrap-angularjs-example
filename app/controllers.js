var aMailServices = angular.module("AMail", ['ngRoute']);

function emailRouteConfig($routeProvider) {
    $routeProvider
        .when("/", {
            controller: ListController,
            templateUrl: 'app/partials/list.html'
        })
        .when("/view/:id", {
            controller: DetailController,
            templateUrl: 'app/partials/detail.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}

aMailServices.config(emailRouteConfig);

aMailServices.factory("MessagesService", function($http){
    var messagesService = {};
    messagesService.async = function() {
        var promise = $http
            .get("messages.json")
            .success(function(data, status, headers, config){
                return data;
            });
        return promise;
    };
    return messagesService;
});

function ListController($scope, MessagesService) {
    MessagesService
        .async()
        .then(function(data) {
            $scope.messages = data.data;
        });
}

function DetailController($scope, $routeParams, MessagesService) {
    MessagesService
        .async()
        .then(function(data) {
            $scope.message = data.data[$routeParams.id];
        });
}

