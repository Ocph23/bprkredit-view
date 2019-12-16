angular.module("helper.service",[])
.factory("helperServices",helperServices)
;



function helperServices (message){
    var service={};
    //service.url="http://testing.stimiksepnop.ac.id";
    service.url="https://kreditbpr.herokuapp.com/";
    service.spinner=false;

    return {url:service.url,spinner:service.spinner,errorHandler:errorHandler};

    function errorHandler(err){
       message.error(err.message,err.status);
    }



}



