angular.module("auth.service",[])

.factory("AuthService",AuthService)


;




function AuthService($http ,$q, StorageService){



    return {
        login:login,
    }


    function login(user){
       var def = $q.defer();
       
    //    $http({
    //        url:"",
    //        methode:"post",
    //        ContentType:"json/application",
    //        data:user
    //    }).then(res=>{},err=>{});

        def.resolve(true);


        return def.promise;


    }


}