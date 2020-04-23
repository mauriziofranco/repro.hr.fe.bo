//dev environment
//BACKEND | START
var HOST_BACKEND_LOCATION="http://centauri.proximainformatica.com:91";
var CONTEXT_PATH_SERVICES="/cerepro.hr.backend";
var MAIN_BACKEND_LOCATION=HOST_BACKEND_LOCATION+CONTEXT_PATH_SERVICES;
//BACKEND | END


//CENTAURI LIBRARY | START
var LIBRARY_BACKEND_LOCATION=HOST_BACKEND_LOCATION;
var bookResourceApi  = LIBRARY_BACKEND_LOCATION + '/centauriLibraryBackend/api/v1/book/';
var thumbImgFullPath = "/thumbnails/" ;
//CENTAURI LIBRARY | END