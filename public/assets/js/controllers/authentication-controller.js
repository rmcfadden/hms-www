var app = angular.module("hmsAdmin", []);
         
app.controller("authenticationController", function($scope, $http) {
 	
	$scope.submitLogin = function() {
		
		var formData = angular.toJson($scope.form)


console.log('email');
console.log($scope.email);

		$http({
	    method : 'POST',
	    url : '/api/login',
	    data : { username : $scope.username, password: $scope.password},
	    headers : {
	      'Content-Type' : 'application/json'
		  }
		}).then( _success, _error ); 
	};

	function _success(){
	}


	function _error(){
	}

});