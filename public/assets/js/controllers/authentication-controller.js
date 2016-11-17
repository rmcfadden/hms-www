angular.module("hms").controller("authenticationController", function($scope, $http) {
 	
	$scope.submitLogin = function() {
		
		$('#ajax-loader').showSpinner();
		$('#message-panel').hideMessagePanel();


		$http({
	    method : 'POST',
	    url : '/api/login',
	    data : { email : $scope.email, password: $scope.password},
	    headers : {
	      'Content-Type' : 'application/json'
		  }
		}).then( _loginSuccess, _loginError )
		.finally(function() {
			$('#ajax-loader').hideSpinner();
		});
	};

	function _loginSuccess(response){
		window.location = '/admin/destinations';
	}


	function _loginError(response){
		$('#message-panel').showMessagePanel(response.data.message);
	}

	$scope.logout = function() {

		$http({
	    method : 'POST',
	    url : '/api/logout',
	    headers : {
	      'Content-Type' : 'application/json'
		  }
		}).then( _logoutSuccess, _logoutError );
	}

	function _logoutSuccess(response){
		window.location = '/admin/login';
	}

	function _logoutError(response){
			alert('LOGOUT ERROR!');
	}

});