var app = angular.module("hmsAdmin", []);
         
app.controller("authenticationController", function($scope, $http) {
 	
	$scope.submitLogin = function() {
		
		$('#message-panel').hideMessagePanel();

		var formData = angular.toJson($scope.form)

		$('#ajax-loader').showSpinner();

console.log('username');
console.log($scope.username);

		$http({
	    method : 'POST',
	    url : '/api/login',
	    data : { username : $scope.username, password: $scope.password},
	    headers : {
	      'Content-Type' : 'application/json'
		  }
		}).then( _success, _error )
			.finally(function() {
				$('#ajax-loader').hideSpinner();
			});
	};

	function _success(response){
		alert('SUCCESS!!!');
	}


	function _error(response){

		$('#message-panel').showMessagePanel(response.data.message)
	}

});