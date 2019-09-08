angular.module("ao.controller",[])
.controller("ao-home-controller",AoHomeController)
.controller("ao-debitur-controller",AoDebiturController)



;



function AoHomeController(){
  var thisRole = "AnalystOfficer";
  if (!AuthService.userIsLogin() && ! AuthService.userInRole(this.thisRole))
    $state.go("login");
}

function AoDebiturController($scope,DebiturService,message){
    $scope.model = {};
    DebiturService.get().then(x => {
      $scope.datas = x;
    });
  
    $scope.edit = function(data) {
      $scope.model = data;
    };
  
    $scope.save = function(data) {
      if (data.idPersyaratan == undefined) {
        DebiturService.post(data).then(x => {
          $("#basicExampleModal").modal("hide");
          message.info("Data Berhasil Ditembah");
        });
      } else {
        DebiturService.put(data).then(x => {
          $("#basicExampleModal").modal("hide");
          message.info("Data Berhasil Diubah");
        });
      }
  
      $scope.model = {};
    };
  
    $scope.delete = function(data) {
      message.dialog("Hapus Data ...", "OK").then(
        x => {
          DebiturService.remove(data).then(z => {
            message.info("Berhasil Dihapus");
          });
        },
        cancel => {}
      );
    };
}