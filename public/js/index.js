angular.module('myApp', [])
    .controller('MyController', ['$scope', '$http', function($scope, $http) {
    $scope.sendTxt = function() {
        $http({
            method: 'POST',
            url: '/keitaiso',
            data: { testwords: $scope.testwords },
        })
        .success(function(data, status, headers, config) {
            $scope.results = data;
        })
        .error(function(data, status, headers, config){
            $scope.result = '失敗';
        });
    };
}]);
