angular
  .module("auth.service", [])

  .factory("AuthService", AuthService);

function AuthService($http, $q, StorageService, $state, helperServices) {
  var service = {};
  service.me=null;

  return {
    login: login,
    logoff: logoff,
    userIsLogin: userIsLogin,
    getUserName: getUserName,
    userIsLogin: userIsLogin,
    userInRole: userInRole,
    getHeader: getHeader,
    url: service.url,updatemitrauser:updatemitrauser,
    registerMitraUser:registerMitraUser,
    me:getMe
  };

  function login(user) {
    var def = $q.defer();
    $http({
      method: "POST",
      url: helperServices.url + "/api/Users/Login",
      headers: getHeader(),
      data: user
    }).then(
      res => {
        StorageService.addObject("user", res.data.data);
        def.resolve(res.data.data);
      },
      err => {
        helperServices.errorHandler(err);
      }
    );

    return def.promise;
  }


  function getMe() {
    var def = $q.defer();
    if(service.me)
    {
      def.resolve(service.me);
    }else{
      $http({
        method: "Get",
        url: helperServices.url + "/api/auth/me",
        headers: getHeader()
      }).then(
        res => {
          service.me=res.data;
          def.resolve(service.me);
        },
        err => {
          helperServices.errorHandler(err);
        }
      );
    }
    return def.promise;
  }

  function getHeader() {
    try {
      if (userIsLogin()) {
        var token = getToken();

        return {
          "Content-Type": "application/json",
          Authorization: getToken()
        };
      } else {
        return {
          "Content-Type": "application/json"
        };
      }
    } catch {
      return {
        "Content-Type": "application/json"
      };
    }
  }

  function logoff() {
    StorageService.clear();
    $state.go("login");
  }

  function getUserName() {
    if (userIsLogin) {
      var result = StorageService.getObject("user");
      return result.Username;
    }
  }

  function userIsLogin() {
    var result = StorageService.getObject("user");
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  function userInRole(role) {
    var result = StorageService.getObject("user");
    if (result && result.Role===role) {
      return true;
    }
  }

  function getToken() {
    var result = StorageService.getObject("user");
    if (result && result.Token) {
      return result.Token;
    }
  }


  function updatemitrauser(model){
    var def = $q.defer();
    $http({
      method: "Put",
      url: helperServices.url + "/api/auth/updatemitrauser/"+model.idUserMitraBayar,
      headers: getHeader(),
      data: model
    }).then(
      data => {
        def.resolve(data);
      },
      err => {
        helperServices.errorHandler(err);
        model.status=!model.status;
      }
    );
    return def.promise;
  }

  function registerMitraUser(model) {
    var def = $q.defer();
    $http({
      method: "POST",
      url: helperServices.url + "/api/auth/addmitrauser",
      headers: getHeader(),
      data: model
    }).then(
      data => {
        def.resolve(data);
      },
      err => {
        helperServices.errorHandler(err);
      }
    );

    return def.promise;

  }
}
