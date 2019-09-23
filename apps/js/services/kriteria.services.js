angular
  .module("kriteria.service", [])

  .factory("KriteriaService", KriteriaService);

function KriteriaService(AuthService, $q, $http, message,helperServices) {
  var service = {};
  service.instance = false;
  service.datas = [];

  return {
    get: getData,
    getById: getDatabyId,
    post: postData,
    put: putData,
    remove: removeData
  };

  function getData() {
    var def = $q.defer();

    if (!service.instance) {
      $http({
        method: "GET",
        url: helperServices.url + "/api/Kriteria",
        headers: AuthService.getHeader()
      }).then(
        x => {
          service.instance = true;
          datas = x.data.data;
          def.resolve(datas);
        },
        err => {
          helperServices.errorHandler(err);
          def.reject(err);
        }
      );
    } else {
      def.resolve(datas);
    }

    return def.promise;
  }

  function getDatabyId(params) {}

  function postData(params) {
    var def = $q.defer();
    $http({
      method: "POST",
      url: helperServices.url + "/api/Kriteria",
      headers: AuthService.getHeader(),
      data: params
    }).then(
      x => {
        
        params.idkriteria=x.data.data;
        datas.push(params);
        
        def.resolve(x.data);
      },
      err => {
        helperServices.errorHandler(err);
        def.reject(err);
      }
    );

    return def.promise;
  }

  function putData(params) {
    var def = $q.defer();
    try {
      $http({
        method: "PUT",
        url: helperServices.url + "/api/Kriteria/" + params.idkriteria,
        headers: AuthService.getHeader(),
        data: params
      }).then(
        res => {
          var dataInCollection = datas.find(
            x => x.idpersyaratan == params.idkriteria
          );
          if (dataInCollection) {
            dataInCollection.namaKriteria = res.data.namaKriteria;
            def.resolve(res.data);
          } else {
            def.resolve(res.data);
          }
        },
        err => {
          helperServices.errorHandler(err);
        }
      );
    } catch (error) {
      helperServices.errorHandler(err);
    }
    return def.promise;
  }

  function removeData(params) {
    var def = $q.defer();
    try {
        message.dialogDelete("Yakin Hapus Data ? ",
        helperServices.url + "/api/Kriteria/" + params.idkriteria,
        AuthService.getHeader())
        .then(
          x => {
            var index = datas.indexOf(params);
            datas.splice(index, 1);
            def.resolve(true);
          },
          err => {
            helperServices.errorHandler(err);
          }
        );
    } catch (err) {
      helperServices.errorHandler(err);
    }
    return def.promise;
  }
}
