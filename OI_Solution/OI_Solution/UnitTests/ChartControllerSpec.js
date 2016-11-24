/// <reference path="../Scripts/FrameworkFiles/angular.js" />
/// <reference path="../Scripts/FrameworkFiles/angular-route.js" />
/// <reference path="../Scripts/FrameworkFiles/angular-mocks.js" />
/// <reference path="../Scripts/FrameworkFiles/ui-bootstrap-tpls-2.2.0.js" />
/// <reference path="../Scripts/RoutingFile.js" />
/// <reference path="../Scripts/Controllers/ChartController.js" />

describe('Testing ChartController', function () {
    //var addService;

    var ctrl, scope, log, interval;

    beforeEach(function () {
        module('app');
    });
    
    beforeEach(inject(function ($controller, $rootScope, $log, $interval) {
        scope = $rootScope.$new();
        log = $log;
        interval = $interval;
        ctrl = $controller('chartController', { $scope: scope, $log: log, $interval: interval });
    }));

    it('Test Controller Init', function () {
        expect(scope.stockdata).not.toBeNull();
        expect(scope.stockdata[0]).toEqual({ hour: 1, price: 54 });
        expect(scope.stockdata[0].hour).toEqual(1);
        expect(scope.stockdata[1].price).toEqual(66);
    });

});