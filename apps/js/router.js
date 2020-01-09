angular.module('app.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/account/login');
	$stateProvider
		.state('account', {
			url: '/account',
			templateUrl: '../apps/views/accounts/account.html'
		})
		.state('login', {
			url: '/login',
			parent: 'account',
			controller: 'LoginController',
			templateUrl: '../apps/views/accounts/login.html'
		})
		.state('register', {
			url: '/register',
			parent: 'account',
			templateUrl: '../apps/views/accounts/register.html'
		})
		//cs
		.state('CustomerService', {
			url: '/cs',
			controller: 'cs-controller',
			templateUrl: '../apps/views/cs/cs.html'
		})
		.state('cs-home', {
			url: '/home',
			parent: 'CustomerService',
			controller: 'cs-home-controller',
			templateUrl: '../apps/views/cs/cs-home.html'
		})
		.state('cs-debitur', {
			url: '/debitur',
			parent: 'CustomerService',
			controller: 'cs-debitur-controller',
			templateUrl: '../apps/views/cs/cs-debitur.html'
		})
		.state('cs-new-debitur', {
			url: '/new-debitur',
			parent: 'CustomerService',
			controller: 'cs-new-debitur-controller',
			templateUrl: '../apps/views/cs/cs-newdebitur.html'
		})
		.state('cs-edit-debitur', {
			url: '/edit-debitur/{debitur:json}',
			parent: 'CustomerService',
			params: null,
			controller: 'cs-edit-debitur-controller',
			templateUrl: '../apps/views/cs/cs-editdebitur.html'
		})
		//ao

		.state('AnalystOfficer', {
			url: '/ao',
			controller: 'ao-home-controller',
			templateUrl: '../apps/views/ao/ao.html'
		})
		.state('ao-home', {
			parent: 'AnalystOfficer',
			url: '/home',
			controller: 'ao-home-controller',
			templateUrl: '../apps/views/ao/ao-home.html'
		})
		.state('ao-debitur', {
			parent: 'AnalystOfficer',
			url: '/debitur',
			controller: 'ao-debitur-controller',
			templateUrl: '../apps/views/ao/ao-debitur.html'
		})
		.state('ao-detail-debitur', {
			url: '/detail-debitur/{debitur:json}',
			parent: 'AnalystOfficer',
			params: null,
			controller: 'ao-detail-debitur-controller',
			templateUrl: '../apps/views/ao/ao-detail-debitur.html'
		})
		.state('ao-periode', {
			parent: 'AnalystOfficer',
			url: '/periode',
			controller: 'ao-periode-controller',
			templateUrl: '../apps/views/ao/ao-periode.html'
		})
		.state('ao-hasil', {
			parent: 'AnalystOfficer',
			url: '/hasil/:id',
			parent: 'AnalystOfficer',
			controller: 'ao-hasil-controller',
			templateUrl: '../apps/views/ao/ao-hasil.html'
		})
		.state('ao-periode-detail', {
			url: '/periode-detail/:id',
			parent: 'AnalystOfficer',
			controller: 'ao-periode-detail-controller',
			templateUrl: '../apps/views/ao/ao-periode-detail.html'
		})
		//end ao

		//komite
		.state('komitekredit', {
			url: '/komitekredit',
			controller: 'komitekredit-controller',
			templateUrl: '../apps/views/komitekredit/komitekredit.html'
		})
		.state('komitekredit-home', {
			url: '/home',
			parent: 'komitekredit',
			controller: 'komitekredit-home-controller',
			templateUrl: '../apps/views/komitekredit/komitekredit-home.html'
		})
		.state('komitekredit-kriteria', {
			url: '/kriteria',
			parent: 'komitekredit',
			controller: 'komitekredit-kritera-controller',
			templateUrl: '../apps/views/komitekredit/komitekredit-kriteria.html'
		})
		.state('komitekredit-persyaratan', {
			url: '/persyaratan',
			parent: 'komitekredit',
			controller: 'komitekredit-persyaratan-controller',
			templateUrl: '../apps/views/komitekredit/komitekredit-persyaratan.html'
		})
		//end komite
		.state(
			'about',
			{
				// we'll get to this in a bit
			}
		);
});
