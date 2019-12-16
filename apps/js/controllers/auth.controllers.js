angular.module('auth.controller', []).controller('LoginController', LoginController);

function LoginController($scope, $state, AuthService) {
	$scope.isCompleted = true;
	$scope.login = function(user) {
		$scope.isCompleted = false;
		AuthService.login(user).then(
			(x) => {
				$scope.isCompleted = true;
				switch (x.Role) {
					case 'KomiteKredit':
						$state.go('KomiteKredit');
						break;

					case 'CustomerService':
						$state.go('CustomerService');
						break;

					case 'AnalystOfficer':
						$state.go('AnalystOfficer');

					default:
						$state.go('login');
				}
			},
			(err) => {
				$scope.isCompleted = true;
			}
		);
	};
}
