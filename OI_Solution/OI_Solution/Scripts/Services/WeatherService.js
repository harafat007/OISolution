///removed

angular.module('app')
.service('weatherService', function ($log, $http) {
    var isGeoOK = false;
    var isWeatherOK = false;
    this.isComplete = false;
    var weatherResult = '';

    this.changeStatus = function ($scope, msg) {
        $scope.message = msg;
    }

    this.populateWeatherInfo = function ($scope, status) {
        if (status.isGeoOK === false) {
            if (status.isWeatherOK === false)
                $scope.message = 'Geolocation Detection failed';
            else {
                $scope.message = 'Geolocation Detection failed. Default city was chosen to get weather info';
                $scope.weatherInfo = status.weatherResult;
            }
        }
        else {
            if (status.isWeatherOK === false)
                $scope.message = 'Sorry weather information couldnt be retrieved';
            else {
                $scope.message = 'Make you plans based on the weather information. Enjoy your day.';
                $scope.weatherInfo = status.weatherResult;
            }
        }
    }
    function handleError(err) {
        var errorMsg = ''; var errorCode = '';
        switch (err.code) {
            case err.PERMISSION_DENIED:
            case err.POSITION_UNAVAILABLE:
            case err.PERMISSION_DENIED_TIMEOUT:
                errorMsg = err.message; errorCode = err.code;
                break;
            case err.UNKNOWN_ERROR:
            default:
                errorCode = -999;
                errorMsg = 'An unknown error occurred.';
                break;
        }
        isGeoOK = false; //well, not required
        $log.log('Geolocation Error Code = ' + errorCode + ' .Error Message = ' + errorMsg);

        var url = 'http://api.openweathermap.org/data/2.5/weather?callback=JSON_CALLBACK&q=' + defaultCity + '&APPID=' + weatherAPIKey;

        $http.jsonp(url)
        .success(function (data, status, headers, config) {
            weatherResult = data;
            isWeatherOK = true;
        })
        .error(function (data, status, headers, config) {
            isWeatherOK = false;
            $log.log('error : ' + data);
        });

    }

    function handlePosition(pos) {
        $log.log('Your location is: ' + pos.coords.latitude + ', ' + pos.coords.longitude);
        isGeoOK = true;
        var url = 'http://api.openweathermap.org/data/2.5/weather?callback=JSON_CALLBACK&lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude + '&APPID=' + weatherAPIKey;

        $http.jsonp(url)
        .success(function (data, status, headers, config) {
            weatherResult = data;
            isWeatherOK = true;
        })
        .error(function (data, status, headers, config) {
            isWeatherOK = false;
            $log.log('error : ' + data);
        });
    }

    this.getWeatherInformationByCity = function (city) {
        isGeoOK = true;
        var url = 'http://api.openweathermap.org/data/2.5/weather?callback=JSON_CALLBACK&q=' + city + '&APPID=' + weatherAPIKey;

        $http.jsonp(url)
        .success(function (data, status, headers, config) {
            weatherResult = data;
            isWeatherOK = true;
        })
        .error(function (data, status, headers, config) {
            isWeatherOK = false;
            $log.log('error : ' + data);
        });
    }

    this.getWeatherWithoutUserIntervention = function () {
        var openWeatherMap = 'http://api.openweathermap.org/data/2.5/weather'
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(handlePosition, handleError);
        }
    }

    this.getWeatherStatus = function () {
        var status =
        {
            isGeoOK: isGeoOK, isWeatherOK: isWeatherOK, weatherResult: weatherResult
        };

        return status;
    }

});
