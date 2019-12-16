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
			url: '/edit-debitur/{id}',
			parent: 'CustomerService',
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
			url: '/detail-debitur/{id}',
			parent: 'AnalystOfficer',
			controller: 'ao-detail-debitur-controller',
			templateUrl: '../apps/views/ao/ao-detail-debitur.html'
		})
		//end ao


        //komite
		.state('KomiteKredit', {
			url: '/KomiteKredit',
			controller: 'komitekredit-controller',
			templateUrl: '../apps/views/KomiteKredit/KomiteKredit.html'
        })
        .state('cs-kriteria', {
			url: '/kriteria',
			parent: 'KomiteKredit',
			controller: 'komitekredit-kritera-controller',
			templateUrl: '../apps/views/komitekredit/komitekredit-kriteria.html'
		})
		.state('cs-persyaratan', {
			url: '/persyaratan',
			parent: 'KomiteKredit',
			controller: 'komitekredit-persyaratan-controller',
			templateUrl: '../apps/views/komitekredit/komitekredit-persyaratan.html'
		})

		.state('komitekredit-periode', {
			url: '/pediode',
			parent: 'KomiteKredit',
			controller: 'KomiteKredit-periode-controller',
			templateUrl: '../apps/views/KomiteKredit/KomiteKredit-periode.html'
		})
		.state('komitekredit-periode-detail', {
			url: '/pediode-detail/{periode:json}',
			parent: 'KomiteKredit',
			params:null,
			controller: 'KomiteKredit-periode-detail-controller',
			templateUrl: '../apps/views/KomiteKredit/KomiteKredit-periode-detail.html'
		})

        //end komite
        


		.state(
			'about',
			{
				// we'll get to this in a bit
			}
		);
});
