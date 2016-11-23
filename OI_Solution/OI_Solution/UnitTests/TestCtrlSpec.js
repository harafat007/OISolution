
/// <reference path="../Scripts/FrameworkFiles/angular.js" />
/// <reference path="../Scripts/FrameworkFiles/angular-mocks.js" />
/// <reference path="../Scripts/FrameworkFiles/angular-route.js" />
/// <reference path="../Scripts/FrameworkFiles/ui-bootstrap-tpls-2.2.0.js" />
/// <reference path="../Scripts/RoutingFile.js" />

/// <reference path="../Scripts/Controllers/TestCtrl.js" />

describe('Testing TestCtrl ', function () {
    //initialize Angular

    beforeEach(function () {
        module('app');
        //angular.mock.module('ui.bootstrap', []);
        //angular.mock.module('ngRoute', []);
        //angular.mock.module('app', ['ui.bootstrap', 'ngRoute']);
    });

    //parse out the scope for use in our unit tests.
    var scope;
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        var ctrl = $controller('testController', { $scope: scope });
        console.info('controller created');
    }));

    it('will test value of x', function () {
        console.info('scope.x = ' + scope.x);
        expect(scope.x).toBe(5); 
    });
});