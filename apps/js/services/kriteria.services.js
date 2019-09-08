angular.module("kriteria.service",[])

.factory("KriteriaService",KriteriaService)


;

function KriteriaService(AuthService,$q, $http, message){

    var service={};
    service.instance=false;
    service.datas=[{idKriteria:1, namaKriteria:"Kemampuan Mengembalikan Pinjaman",deskripsi:""}];

    getData();

    return {
        get:getData, getById:getDatabyId, post:postData, put:putData,remove:removeData
    }


    function getData(){
        var def=$q.defer();
        if(service.instance)
        {
            def.resolve(service.datas);
        }else{
            service.instance=true;
        }
        return def.promise;

    }

    function getDatabyId(params) {
        
    }

    function postData(params) {
        var def=$q.defer();
        try {
            service.datas.push(params);
            def.resolve(params);
        } catch (err) {
            def.reject(err);
        }
        return def.promise;
    }

    function putData(params) {
        var def=$q.defer();
        try {

            def.resolve(params);
        } catch (err) {
            def.reject(err);
        }
        return def.promise;
    }

    function removeData(params) {
        var def=$q.defer();
        try {
            var index=service.datas.indexOf(params);
            service.datas.splice(index,1);
            def.resolve(params);
        } catch (err) {
            def.reject(err);
        }
        return def.promise;
      
    }

}