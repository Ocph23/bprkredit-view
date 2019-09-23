angular.module("auth.controller",[])

.controller("LoginController",LoginController)

function LoginController($scope,$state,AuthService){
  $scope.login=function(user){
    AuthService.login(user).then(x=>{
      if(x.Role=="Admin")
        $state.go("CustomerService");
        else{
          $state.go("AnalystOfficer");
        }
    })
  }
}

