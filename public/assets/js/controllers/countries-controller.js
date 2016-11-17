angular.module("hms").controller('countriesController', function ($scope, $http) {

  $scope.selectedCountry = null;
  $scope.countries = [];

  $http({
	  method: 'GET',
	  url: '/api/countries'
  }).success(function (countries) {
  	$scope.countries = countries;
  });

});