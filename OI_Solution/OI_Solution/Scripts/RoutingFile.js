
var app = angular.module("app", ["ui.bootstrap", "ngRoute"])
                 .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
                     $routeProvider
                         .when("/home",
                         {
                             templateUrl: "Templates/Home.html",
                             controller: "homeController"
                         }) // when ends
                         .when("/linechart",
                         {
                             templateUrl: "Templates/LineChart.html",
                             controller: "chartController"
                         }) // when ends
                        .otherwise(
                        {
                            redirectTo: "/home"
                        });

                     $locationProvider.html5Mode(true);
                 }])