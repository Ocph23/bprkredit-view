angular.module("app.router", ["ui.router"])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/account/login');
    $stateProvider
        .state("account",{
            url: '/account',
            templateUrl: '../apps/views/accounts/account.html'
        })

        .state("login",{
            url: '/login',
            parent:'account',
            controller:"LoginController",
            templateUrl: '../apps/views/accounts/login.html'
        })
        .state("register",{
            url: '/register',
            parent:'account',
            templateUrl: '../apps/views/accounts/register.html'
        })



        //cs

        .state("cs",{
            url: '/cs',
            controller:"cs-controller",
            templateUrl: '../apps/views/cs/cs.html'
        })

        .state("cs-home",{
            url: '/home',
            parent:'cs',
            controller:"cs-home-controller",
            templateUrl: '../apps/views/cs/home.html'
        })

        .state("cs-debitur",{
            url: '/debitur',
            parent:'cs',
            controller:"cs-debitur-controller",
            templateUrl: '../apps/views/cs/debitur.html'
        })

        .state("cs-new-debitur",{
            url: '/new-debitur',
            parent:'cs',
            controller:"cs-new-debitur-controller",
            templateUrl: '../apps/views/cs/newdebitur.html'
        })
        .state("cs-edit-debitur",{
            url: '/edit-debitur/{id}',
            parent:'cs',
            controller:"cs-edit-debitur-controller",
            templateUrl: '../apps/views/cs/editdebitur.html'
        })


        .state("cs-kriteria",{
            url: '/kriteria',
            parent:'cs',
            controller:"cs-kritera-controller",
            templateUrl: '../apps/views/cs/kriteria.html'
        })

        .state("cs-persyaratan",{
            url: '/persyaratan',
            parent:'cs',
            controller:"cs-persyaratan-controller",
            templateUrl: '../apps/views/cs/persyaratan.html'
        })



        //ao

        .state("ao",{
            url:"/ao",
            controller:"ao-home-controller",
            template:'Test AO <ui-view></ui-view>'
        })
        .state("ao-home",{
            parent:"ao",
            url:"/home",
            controller:"ao-home-controller",
            templateUrl:'../apps/views/ao-home.html'
        })

        .state('about', {
            // we'll get to this in a bit       
        });

});