angular
  .module("cs.controller", [])
  .controller("cs-debitur-controller", CsDebiturController)
  .controller("cs-home-controller", CsHomeController)
  .controller("cs-kritera-controller", CsKriteraController)
  .controller("cs-persyaratan-controller", CsPersyaratanController)
  .controller("cs-new-debitur-controller", CsNewDebiturController)
  .controller("cs-edit-debitur-controller", CsEditDebiturController)
  .controller("cs-controller", CsController);

function CsController(AuthService, $state) {
  var thisRole = "CustomerService";
  if (!AuthService.userIsLogin() || !AuthService.userInRole(thisRole))
   {
    $state.go("login");
   }
}

function CsHomeController() { }

function CsEditDebiturController($scope, $stateParams, $state, DebiturService, message) {
  var id = $stateParams.id;
  $('#datepicker').datepicker({
    weekStart: 1,
    format: 'dd/mm/yyyy',
    daysOfWeekHighlighted: "6,0",
    autoclose: true,
    todayHighlight: true,
  });

  DebiturService.getById(id).then(x => {
    $scope.model = x;
    $('label').addClass('active');
  });

  $scope.save = function (data) {
    DebiturService.put(data).then(x => {
      message.info("Data Berhasil Diubah");
      $state.go("cs-debitur");
    });
  };
}

function CsNewDebiturController($scope, DebiturService, message, $state) {
  $scope.model = {};
  $scope.Init = function () {
    $("#datepicker").datepicker({
      weekStart: 1,
      daysOfWeekHighlighted: "6,0",
      autoclose: true,
      todayHighlight: true
    });
    $("#datepicker").datepicker("setDate", new Date());
  };



  $scope.save = function (data) {
    DebiturService.post(data).then(x => {
      message.dialog("Tambah Baru").then(
        x => {
          $scope.model = null;
        },
        c => {
          $state.go("cs-debitur");
        }
      );
    });
  };
}

function CsDebiturController($scope, DebiturService, message, $state, AuthService) {



  $scope.model = {};
  DebiturService.get().then(x => {
    $scope.datas = x;

  });

  $scope.edit = function (data) {
    $scope.model = data;
  };

  $scope.save = function (data) {
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

  $scope.delete = function (data) {
    message.dialog("Hapus Data ...", "OK").then(
      x => {
        DebiturService.remove(data).then(z => {
          message.info("Berhasil Dihapus");
        });
      },
      cancel => { }
    );
  };
}

function CsKriteraController($scope, KriteriaService, swangular, message) {
  $scope.model = {};
  KriteriaService.get().then(x => {
    $scope.datas = x;
  });

  $scope.edit = function (data) {
    $scope.model = data;
  };

  $scope.save = function (data) {
    if (data.idPersyaratan == undefined) {
      KriteriaService.post(data).then(x => {
        $("#basicExampleModal").modal("hide");
        swangular.swal({
          title: "Sukses",
          text: "Data Berhasil Ditambah",
          type: "info"
        });
      });
    } else {
      KriteriaService.put(data).then(x => {
        $("#basicExampleModal").modal("hide");
        swangular.swal({
          title: "Sukses",
          text: "Data Berhasil Diubah",
          type: "info"
        });
      });
    }

    $scope.model = {};
  };

  $scope.delete = function (data) {
    message.dialog("Hapus Data ...", "OK").then(
      x => {
        KriteriaService.remove(data).then(z => {
          message.info("Berhasil Dihapus");
        });
      },
      cancel => { }
    );
  };
}

function CsPersyaratanController(
  $scope,
  PersyaratanService,
  swangular,
  message
) {
  $scope.model = {};
  PersyaratanService.get().then(x => {
    $scope.datas = x;
  });

  $scope.edit = function (data) {
    $scope.model = data;
  };

  $scope.save = function (data) {
    if (data.idPersyaratan == undefined) {
      PersyaratanService.post(data).then(x => {
        $("#basicExampleModal").modal("hide");
        swangular.swal({
          title: "Sukses",
          text: "Data Berhasil Ditambah",
          type: "info"
        });
      });
    } else {
      PersyaratanService.put(data).then(x => {
        $("#basicExampleModal").modal("hide");
        swangular.swal({
          title: "Sukses",
          text: "Data Berhasil Diubah",
          type: "info"
        });
      });
    }

    $scope.model = {};
  };

  $scope.delete = function (data) {
    message.dialog("Hapus Data ...", "OK").then(
      x => {
        PersyaratanService.remove(data).then(z => {
          message.info("Berhasil Dihapus");
        });
      },
      cancel => { }
    );
  };
}
