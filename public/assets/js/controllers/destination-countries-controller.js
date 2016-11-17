angular.module("hms").controller('destinationCountriesController', function ($scope, $http) {

  $scope.selectedDestinationCountry = null;
  $scope.destinationCountries = [];

  $http({
	  method: 'GET',
	  url: '/api/destination-countries'
  }).success(function (destinationCountries) {
  	$scope.destinationCountries = destinationCountries;
  });

});