angular.module("debitur.service",[])

.factory("DebiturService",DebiturService)


;

function DebiturService(AuthService,$q, $http, message){

    var service={};
    service.instance=false;
    service.datas=[{iddebitur:1, nama:"Rahmat Alan",pekerjaan:"swasta", lamaTinggal: "1 tahun", tempatLahir:"Jayapura", 
    tanggalLahir:new Date(),alamat:"Jln. Ardipura No 23 \rn Jayapura", 
    telepon:"081481145",namaPasangan:"Evy", pekerjaanPasangan:"swasta",
     namaPerusahaan:"CV. Trireksa Papua Cargo", statusUsaha:"Sendri" }];

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
        var def=$q.defer();
        try {
            var result =service.datas.find(x=>x.iddebitur==params);
            def.resolve(result);
        } catch (err) {
            def.reject(err);
        }
        return def.promise;
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