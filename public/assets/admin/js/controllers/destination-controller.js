'use strict';

angular.module("hms")
.config(function ($routeProvider, $locationProvider) {

	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

  // configure the routing rules here
  $routeProvider.when('/admin/destination/:country/:name', {
    controller: 'destinationController'
  });

})
.controller('destinationController', function ($scope,  $http, $routeParams) {

	$scope.$on('$routeChangeSuccess', function() {
		$scope.destinationCountry = $routeParams.country; 
		$scope.destinationName = $routeParams.name; 

		$scope.loadDestination();
	});

	$scope.loadDestination = function() {
		$('#ajax-loader').showSpinner();

		var response = $http({
	    method : 'GET',
	    url : '/api/destination/' + $scope.destinationCountry + '/' + $scope.destinationName + '/',
	    data : { },
	    headers : {
	      'Content-Type' : 'application/json'
		  }
		});

		response.success(function(data, status, headers, config) {
      console.log(data);
      $scope.destination = data;

			var simplemde = new SimpleMDE({ element: $("#description-textarea")[0] });
			simplemde.value($scope.destination.description);
    
     	$('description-textarea').val($scope.destination.description);

    });
	};
});


function _loadDestinationSuccess(response){
	console.log('response');
	console.log(response);

	$scope.destination = response.data;
}


function _loadDestinationError(response){
	$('#message-panel').showMessagePanel(response.data.message);
}


angular.module('hms')
.controller('destinationManageController', function($scope, $http) {

	$scope.addUpdateDestination = function() {
		
alert('DESTINATION!!!');

		$('#ajax-loader').showSpinner();
		$('#message-panel').hideMessagePanel();

		$http({
	    method : 'POST',
	    url : '/api/destination',
	    data : { },
	    headers : {
	      'Content-Type' : 'application/json'
		  }
		}).then( _addUpdateSuccess, _addUpdateError )
		.finally(function() {
			$('#ajax-loader').hideSpinner();
		});
	};


	function _addUpdateSuccess(response){
	}


	function _addUpdateError(response){
		$('#message-panel').showMessagePanel(response.data.message);
	}
});
