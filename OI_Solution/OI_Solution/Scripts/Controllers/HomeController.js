
angular.module("app")
.controller("homeController", function ($scope, $uibModal, $log, weatherService, $timeout) {
    //$scope.message = 'Temp2';
    $scope.errorMsg = '';
    $scope.isGeoOK = false;
    var modalInstance2 = null;
    $scope.weatherFetched = false;

    var modalInstance = $uibModal.open({

        templateUrl: '../Templates/weatherModal.html',
        size: 'sm',
        backdrop: false, //cant close by back clickg
        controller: function ($scope, $uibModalInstance) {
            $scope.msg = 'top';
            $scope.userOK = function () {
                //$scope.data = 'Okay';
                $uibModalInstance.close('Fetching..'); //pass the result
            };

            $scope.userCancel = function () {
                //$scope.data1 = 'data1';

                //level2 modal begins

                modalInstance2 = $uibModal.open({

                    templateUrl: '../Templates/cityWeatherModal.html',
                    size: 'sm',
                    backdrop: false, //cant close by back clickg
                    controller: function ($scope, $uibModalInstance) {
                        
                        $scope.userOK2 = function () {
                            //$scope.data2 = 'data2';
                            $uibModalInstance.close($scope.city); //pass the result
                        };

                        $scope.userCancel2 = function () {
                            $uibModalInstance.dismiss('cancel'); //pass the reason
                        };
                    }
                }); //level2 modal open

                modalInstance2.result.then(function (city) {
                    $uibModalInstance.dismiss('level1 modal closed from level2 OK');
                    ChangeStatus('Fetching..');
                    //weatherService.changeStatus($scope, 'Fetching..');
                    weatherService.getWeatherInformationByCity(city);

                    $timeout(function () {
                        var status = weatherService.getWeatherStatus();
                        PopulateWeatherInfo(status);
                    }, 8000);

                }, function (cancelInfo) {
                    var msg = 'level1 modal Dismissed without action from level2 Dismiss';
                    $uibModalInstance.dismiss(msg);
                    $log.info(msg);
                });

                //level2 modal              
            };
        }
    });


    //level1 modal handling
    modalInstance.result.then(function (data) {
        $scope.message = data;
        weatherService.getWeatherWithoutUserIntervention()

        $timeout(function () {
            var status = weatherService.getWeatherStatus();
            PopulateWeatherInfo(status);
        }, 6000);

    }, function (cancelInfo) {
        $log.info('modal-component dismissed ');
    });

    ChangeStatus = function(msg)
    {
        //$scope.message = msg;
        weatherService.changeStatus($scope, msg);
    }

    PopulateWeatherInfo = function (status) {
        weatherService.populateWeatherInfo($scope, status);
        $scope.weatherFetched = true;
        $log.log('weatherFetched=' + $scope.weatherFetched);
        //if (status.isGeoOK === false) {
        //    if (status.isWeatherOK === false)
        //        $scope.message = 'Geolocation Detection failed';
        //    else {
        //        $scope.message = 'Geolocation Detection failed. Default city was chosen to get weather info';
        //        $scope.weatherInfo = status.weatherResult;
        //    }
        //}
        //else {
        //    if (status.isWeatherOK === false)
        //        $scope.message = 'Sorry weather information couldnt be retrieved';
        //    else {
        //        $scope.message = 'Make you plans based on the weather information. Enjoy your day.';
        //        $scope.weatherInfo = status.weatherResult;
        //    }
        //}
    }

})
