/// <reference path="../Scripts/FrameworkFiles/angular.js" />
/// <reference path="../Scripts/FrameworkFiles/angular-route.js" />
/// <reference path="../Scripts/FrameworkFiles/ui-bootstrap-tpls-2.2.0.js" />
/// <reference path="../Scripts/FrameworkFiles/angular-mocks.js" />
/// <reference path="../Scripts/RoutingFile.js" />
/// <reference path="../Scripts/Services/WeatherService.js" />
/// <reference path="../Scripts/Controllers/HomeController.js" />

describe('Testing HomeController', function () {
    //var addService;

    var ctrl, scope, uibModal, log, weatherServiceMock, timeout;

    beforeEach(function () {
        module('app');
    });

    beforeEach(inject(function ($controller, $rootScope, $uibModal, $log, weatherService, $timeout) {
        scope = $rootScope.$new();
        uibModal = $uibModal;
        log = $log;
        weatherServiceMock = weatherService;
        timeout = $timeout;
        ctrl = $controller('homeController', { $scope: scope, $uibModal: uibModal, $log: log, weatherService: weatherServiceMock, $timeout: timeout });
    }));

    it('Test Controller Init', function () {
        expect(scope.errorMsg).toEqual('');
        expect(scope.isGeoOK).toEqual(false);
    });

});