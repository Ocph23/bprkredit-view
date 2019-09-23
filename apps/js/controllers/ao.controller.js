angular.module("ao.controller",[])
.controller("ao-home-controller",AoHomeController)
.controller("ao-debitur-controller",AoDebiturController)
.controller("ao-detail-debitur-controller",AoDetailDebiturController)

;



function AoHomeController($scope,AuthService,$state){
  var thisRole = "AnalystOfficer";
  if (!AuthService.userIsLogin() || !AuthService.userInRole(thisRole))
   {
    $state.go("login");
   }
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



function AoDetailDebiturController($scope, $stateParams, $state, DebiturService, PersyaratanService, message) {
  var id = $stateParams.id;
  $('#datepicker').datepicker({
    weekStart: 1,
    format: 'dd/mm/yyyy',
    daysOfWeekHighlighted: "6,0",
    autoclose: true,
    todayHighlight: true,
  });

  DebiturService.getById(id).then(debitur => {
    $scope.model = debitur;

    $('label').addClass('active');

    PersyaratanService.get().then(persyaratan=>{
      $scope.persyaratans=[];
        persyaratan.forEach(element => {
          var dataValue=angular.copy(element);
            var isFound=debitur.persyaratans.find(x=>x.idPersyaratan===element.idPersyaratan);
            if(isFound)
            {
                dataValue.value=true;
            }else{
              dataValue.value=false;
            }
            $scope.persyaratans.push(dataValue);
        });
    });

  });







  $scope.save = function (data) {
    DebiturService.put(data).then(x => {
      message.info("Data Berhasil Diubah");
      $state.go("cs-debitur");
    });
  };
}