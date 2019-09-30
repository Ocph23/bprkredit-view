angular.module('auth.controller', []).controller('LoginController', LoginController);

function LoginController($scope, $state, AuthService) {
	$scope.isCompleted = true;
	$scope.login = function(user) {
		$scope.isCompleted = false;
		AuthService.login(user).then(
			(x) => {
				$scope.isCompleted = true;
				if (x.Role == 'Admin') $state.go('CustomerService');
				else {
					$state.go('AnalystOfficer');
				}
			},
			(err) => {
				$scope.isCompleted = true;
			}
		);
	};
}
