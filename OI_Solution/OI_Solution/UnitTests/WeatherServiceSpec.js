/// <reference path="../Scripts/FrameworkFiles/angular.js" />
/// <reference path="../Scripts/FrameworkFiles/angular-route.js" />
/// <reference path="../Scripts/FrameworkFiles/ui-bootstrap-tpls-2.2.0.js" />
/// <reference path="TestConfig.js" />
/// <reference path="../Scripts/FrameworkFiles/angular-mocks.js" />
/// <reference path="../Scripts/RoutingFile.js" />
/// <reference path="../Scripts/Services/WeatherService.js" />

describe('Testing Weather Service', function () {

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

    it('Method getWeatherInformationByCity', function () {
        var url = 'http://api.openweathermap.org/data/2.5/weather?callback=JSON_CALLBACK&q=Noida&APPID=d68a6b0c7bbc05429e681966a175b1aa';
        http.whenJSONP(url)
        .respond(200, weatherServiceResult);

        weatherServiceMock.getWeatherInformationByCity('Noida');
        http.flush(); //This causes the call to complete

        var status = weatherServiceMock.getWeatherStatus();

        console.info("Log = " + status);
        console.info("Log = " + status.weatherResult.coord.lon);

        expect(status.weatherResult).not.toBeNull();
        expect(status.weatherResult).not.toEqual('');
        expect(status.weatherResult).toEqual(weatherServiceResult);
        expect(status.weatherResult.coord.lon).toEqual(77.33);
        expect(status.weatherResult.coord.lat).toEqual(28.58);
    });

    it('Method changeStatus', function () {
        var msg = 'hello';
        weatherServiceMock.changeStatus(scope, msg);
        console.info('scope.message = ' + scope.message);
        expect(scope.message).toEqual(msg);
    });

    it('Method populateWeatherInfo', function () {
        var status =
        {
            isGeoOK: false, isWeatherOK: true, weatherResult: 'mock data'
        };

        //spyOn(weatherServiceMock, 'getWeatherInformationByCity').and.returnValue({ weatherResult: 'some data' });
        weatherServiceMock.populateWeatherInfo(scope, status);

        console.info('scope.weatherInfo = ' + scope.weatherInfo);
        expect(scope.weatherInfo).not.toBeNull();
        expect(scope.weatherInfo).toEqual('mock data');

        status.isWeatherOK = false; //status.weatherResult = '';

        weatherServiceMock.populateWeatherInfo(scope, status);

        console.info('scope.weatherInfo2 = ' + scope.weatherInfo);
        expect(scope.weatherInfo).not.toBeNull();
        expect(scope.weatherInfo).toEqual('');
        expect(scope.message).toEqual('Geolocation Detection failed');

    });

});