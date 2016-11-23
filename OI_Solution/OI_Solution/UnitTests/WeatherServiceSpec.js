/// <reference path="../Scripts/FrameworkFiles/angular.js" />
/// <reference path="../Scripts/FrameworkFiles/angular-route.js" />
/// <reference path="../Scripts/FrameworkFiles/ui-bootstrap-tpls-2.2.0.js" />
/// <reference path="../Scripts/FrameworkFiles/angular-mocks.js" />
/// <reference path="../Scripts/RoutingFile.js" />
/// <reference path="../Scripts/Services/WeatherService.js" />

describe('Testing Weather Service', function () {
    //var addService;

    var scope, log, http, weatherServiceMock;

    beforeEach(function () {
        module('app');
    });

    beforeEach(inject(function ($rootScope, $httpBackend, $log, weatherService) {
        scope = $rootScope.$new();
        http = $httpBackend;
        log = $log;
        weatherServiceMock = weatherService;
    }));

    it('Method changeStatus', function () {
        var msg = 'hello';
        weatherServiceMock.changeStatus(scope, msg);
        console.info('scope.message = ' + scope.message);
        expect(scope.message).toEqual(msg);
    });

});