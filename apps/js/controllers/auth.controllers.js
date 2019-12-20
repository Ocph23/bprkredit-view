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
						$state.go('komitekredit-home');
						break;

					case 'CustomerService':
						$state.go('cs-home');
						break;

					case 'AnalystOfficer':
						$state.go('ao-home');
						break;

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
