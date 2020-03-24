var itconsultantResourceApi = MAIN_BACKEND_LOCATION+ '/api/v1/itconsultantcustom/';

app.controller('registerSmartItConsultantController', function (notice, $scope, $http, $location, $route) {
    $scope.uploadResult = "";
    var stringMessage = "";
    $scope.myForm = {
    	cvExternalPath: "",
        email: "",
        firstname: "",
        lastname: "",
        
        files: []
    }
    
    $scope.submitUserForm = function () {
    	    	
        // var url = "/rest/uploadMultiFiles";

        if ($scope.validateForm()) {

            var data = new FormData();
            
            data.append("email", $scope.myForm.email);
            data.append("firstname", $scope.myForm.firstname);
            data.append("lastname", $scope.myForm.lastname);
            
            	if (typeof ($scope.myForm.files[1]) != "undefined") {
                    console
                        .log("Files name CV IS PRESENT" +
                            $scope.myForm.files[1].name);
                    data.append("files",
                        $scope.myForm.files[1]);
                    data
                        .append(
                            "cvExternalPath",
                            $scope.myForm.files[1].name);
                } else {
                    data.append("cvExternalPath", null);
                }
            
            var config = {
                transformRequest: angular.identity,
                transformResponse: angular.identity,
                headers: {
                    'Content-Type': undefined

                }
            }

            $http
                .post(itconsultantResourceApi, data, config)
                .then(
                    // Success
                    function (response) {
                        $scope.uploadResult = response.data;
                        console.log(data);
                        $location
                            .path("/list-all-itconsultants");
                        $route.reload();
                        notice.success();
                    },
                    // Error
                    function (response) {
                        $scope.uploadResult = response.data;
                        console.log(response);
                        if (response.status == 500)
                            notice.database();
                        else
                            notice
                            .error(response.data.errorMessage);
                    });
            
        } else {
            notice.error(stringMessage); 
        }
    };
    
    $scope.resetForm = function () {
        $scope.myForm = null;
    };

    $scope.validateForm = function () {
        console.log("validateForm START");

        var firstnameTmp = $scope.myForm.firstname;     
        console.log("firstnameTmp: " + firstnameTmp);       
        var validating = true ;
        if(firstnameTmp == undefined || firstnameTmp == null || firstnameTmp.length == 0)
        {              	
        	stringMessage = "inserisci un nome valido";                        
            console.log(stringMessage);
            validating = false ;
        }
                
        var lastnameTmp = $scope.myForm.lastname;
        console.log("lastnameTmp: " + lastnameTmp);
        if (lastnameTmp == undefined || lastnameTmp == null || lastnameTmp.length == 0) {            	       	
        	stringMessage = "inserisci un cognome valido";       	
            console.log(stringMessage);
            validating = false ;
        }
        
        var emailTmp = $scope.myForm.email;
        console.log("emailTmp: " + emailTmp);
        if (emailTmp == undefined || emailTmp == null || emailTmp.length == 0) {
        	stringMessage = "inserisci una mail valida";
            console.log(stringMessage);
            validating = false ;
        }
         
        console.log("validateForm END --> true"); 
        return validating; 
    }; 

});
		
app.controller('registerItConsultantController', function (notice, $scope, $http, $location, $route) {
    $scope.uploadResult = "";
    var stringMessage = "";
    $scope.myForm = {
        domicileCity: "",
        domicileStreetName: "",
        domicileHouseNumber: "",
        studyQualification: "",
        graduate: "",
        highGraduate: "",
        stillHighStudy: "",
        mobile: "",
        cvExternalPath: "",
        email: "",
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        imgpath: "",

        files: []
    }
    
    var myText = document.getElementById("myText");
    var wordCount = document.getElementById("wordCount");
    $scope.notelengthmax = notelengthmax;
    
    $scope.myForm.note = myText.addEventListener("keyup",function(){
    	var characters = myText.value.split('');
      wordCount.innerText = "Caratteri rimanenti: " + (notelengthmax - characters.length); 
    });  

    $scope.submitUserForm = function () {

        // var url = "/rest/uploadMultiFiles";

        if ($scope.validateForm()) {

            var data = new FormData();

            data.append("domicileCity",
                $scope.myForm.domicileCity);
            data.append("domicileStreetName",
                $scope.myForm.domicileStreetName);
            data.append("domicileHouseNumber",
                $scope.myForm.domicileHouseNumber);
            data.append("studyQualification",
                $scope.myForm.studyQualification);
            data.append("graduate", $scope.myForm.graduate);
            console.log("graduate" + $scope.myForm.graduate);
            data.append("highGraduate",
                $scope.myForm.highGraduate);
            console.log("highGraduate" +
                $scope.myForm.highGraduate);
            data.append("stillHighStudy",
                $scope.myForm.stillHighStudy);
            console.log("stillHighStudy" +
                $scope.myForm.stillHighStudy);
            data.append("mobile", $scope.myForm.mobile);
            data.append("email", $scope.myForm.email);
            data.append("firstname", $scope.myForm.firstname);
            data.append("lastname", $scope.myForm.lastname);

             var dateOfBirth = $scope.myForm.dateOfBirth;
            console.log("dateOfBirth: " + dateOfBirth);
            if (dateOfBirth == undefined || dateOfBirth == null || dateOfBirth.length == 0) {
                dateOfBirth = new Date("11/11/1111");
            }
            
            data.append("dateOfBirth", dateOfBirth);


            if (typeof ($scope.myForm.files[0]) != "undefined") {
                console.log("filesname0 " +
                    $scope.myForm.files[0].name);
                data.append("files", $scope.myForm.files[0]);
                data.append("imgpath",
                    $scope.myForm.files[0].name);
            }

            if (typeof ($scope.myForm.files[1]) != "undefined") {
                console.log("filesname0 " +
                    $scope.myForm.files[1].name);
                data.append("files", $scope.myForm.files[1]);
                data.append("cvExternalPath",
                    $scope.myForm.files[1].name);
            }

            var config = {
                transformRequest: angular.identity,
                transformResponse: angular.identity,
                headers: {
                    'Content-Type': undefined

                }
            }

            $http
                .post(itconsultantResourceApi, data, config)
                .then(
                    // Success
                    function (response) {
                        $scope.uploadResult = response.data;
                        console.log(data);
                        $location
                            .path("/list-all-itconsultants");
                        $route.reload();
                        notice.success();
                    },
                    // Error
                    function (response) {
                        $scope.uploadResult = response.data;
                        console.log(response);
                        if (response.status == 500)
                            notice.database();
                        else
                            notice
                            .error(response.data.errorMessage);

                    });
        } else {
            notice.error(stringMessage);
            
        
        }
    };
  
    $scope.resetForm = function () {
        $scope.myForm = null;
    };

    $scope.validateForm = function () {
        console.log("validateForm START");
        
        var firstnameTmp = $scope.myForm.firstname;
        console.log("firstnameTmp: " + firstnameTmp);
        	var validating = true ;
        if (firstnameTmp == undefined || firstnameTmp == null || firstnameTmp.length == 0) {
        	stringMessage = "inserisci un nome valido";
        	validating = false ; 
        }
        
        
        var lastnameTmp = $scope.myForm.lastname;
        console.log("lastnameTmp: " + lastnameTmp);
        if (lastnameTmp == undefined || lastnameTmp == null || lastnameTmp.length == 0) {         
        	stringMessage = "inserisci un cognome valido";
        	 validating = false ;       	
        }
        
        var emailTmp = $scope.myForm.email;
        console.log("emailTmp: " + emailTmp);
        if (emailTmp == undefined || emailTmp == null || emailTmp == "") {
        	stringMessage = "inserisci una mail valida";
            validating = false ;
        }

//        var domicileCityTmp = $scope.myForm.domicileCity;
//        console.log("domicileCityTmp: " + domicileCityTmp);
//        if (domicileCityTmp == undefined || domicileCityTmp == null || domicileCityTmp == "") {
//        	stringMessage = "inserisci il tuo domicilio";
//            validating = false ;
//        }
//        
//        var domicileStreetNameTmp = $scope.myForm.domicileStreetName;
//        console.log("domicileStreetNameTmp: " + domicileStreetNameTmp);
//        if (domicileStreetNameTmp == undefined ||
//            domicileStreetNameTmp == null ||
//            domicileStreetNameTmp == "") {
//            stringMessage = "inserisci la via del domicilio";
//            return false;
//        }
//
//        var domicileHouseNumberTmp = $scope.myForm.domicileHouseNumber;
//        console.log("domicileHouseNumberTmp: " + domicileHouseNumberTmp);
//        if (domicileHouseNumberTmp == undefined ||
//            domicileHouseNumberTmp == null ||
//            domicileHouseNumberTmp == "") {
//            stringMessage = "inserisci il numero civico della via";
//            return false;
//        }
//
//        var studyQualificationTmp = $scope.myForm.studyQualification;
//        console.log("studyQualificationTmp: " +
//            studyQualificationTmp);
//        if (studyQualificationTmp == undefined || studyQualificationTmp == null || studyQualificationTmp == "") {
//        	stringMessage = "inserisci il tuo titolo di studio";
//            validating = false ;
//        }
        
        var mobileTmp = $scope.myForm.mobile;
        console.log("mobileTmp: " + mobileTmp);
        if (mobileTmp != null) {
            var mobileStr = mobileTmp.toString();
            console.log("mobileTmp.length: " + mobileStr.length + " mobileStr " + mobileStr);
            if (mobileStr.length > 0 && mobileStr.length < 9) {
                console.log("mobileTmp2: " + mobileTmp);
                stringMessage = "lunghezza numero cellulare minima 9";
                return false;
            }
        }
        
        console.log("validateForm END --> true"); 
        return validating ;
    };

});


app.controller('listItConsultantController', function (notice, $scope, $http, $location,
    $route, $interval) {
    //$scope.imgFullPath = "http://centauri.proximainformatica.com/itcimg/";
    //$scope.cvFullPath = "http://centauri.proximainformatica.com/itccv/";


    function listAll() {
        console.log("listAll invoked");
        Pace.restart();
        var currentPage = $scope.currentPage - 1;
        $http({
            method: 'GET',
            url: itconsultantResourceApi + "paginated/" + $scope.pageSize + "/" + currentPage + "/"
        }).then(function (response) {
            $scope.list = response.data.content;
            if (response.data.totalPages != null)
                $scope.totalPages = response.data.totalPages;
            else
            	$scope.totalPages = 1;
        });
    }
    $scope.editItConsultantCustom = function (itConsultantCustomId) {
        $location.path("/update-itconsultant/" + itConsultantCustomId);
    }
    $scope.deleteItConsultantCustom = function (itConsultantCustomId) {
        $http({
            method: 'DELETE',
            url: itconsultantResourceApi + itConsultantCustomId
        }).then(function (response) {
                $location.path("/list-all-itconsultants");
                console.log(response);
                notice.success();
                reload();

            },
            // Error
            function (response) {
                $scope.uploadResult = response.data;
                console.log(response);
                if (response.status == 500)
                    notice.database();
                else                	       
                    notice.error(response.data.errorMessage);
            
            });
    }

    $scope.getItConsultants = function () {
        $scope.currentPage = 1;
        $scope.pageSize = $scope.data.selectedOption.size;
        listAll();
    }

    $scope.nextPage = function () {
        $scope.currentPage += 1;
        listAll();
    };

    $scope.prevPage = function () {
        $scope.currentPage -= 1;
        listAll();
    };

    $scope.data = {
        availableOptions: [{
                id: '1',
                value: '5',
                size: 5
            },
            {
                id: '2',
                value: '10',
                size: 10
            },
            {
                id: '3',
                value: '50',
                size: 50
            },
            {
                id: '4',
                value: '100',
                size: 100
            },
        ],
        selectedOption: {
            id: '1',
            value: '5',
            size: 5
        } //This sets the default value of the select in the ui
    };

    $scope.totalPages = 1;
    $scope.pageSize = $scope.data.selectedOption.size;
    $scope.currentPage = 1;
    $scope.reloadBool = true;
    $scope.reloadItConsultant = 0;
    

    function incrSec() {
        if ($scope.reloadBool) {
            //			console.log("autoReload: " + $scope.reloadBool);
            $scope.reloadItConsultant += 10;
            if ($scope.reloadItConsultant > 100) {
                $scope.reloadItConsultant = 0;
                reload();
            }
        }
    }
    timer = $interval(incrSec, 1000);

    function reload() {
        $scope.reloadItConsultant = 0;
        listAll();
    }
    $scope.listItCons = function () {
        reload();
    }
    reload();
    $scope.autoReload = function autoReload() {
        if ($scope.reloadBool) {
            $scope.reloadBool = false;
            $(document).ready(function () {
                $('#itconsultantbar').addClass('progress-bar-reload-disabled');
            });
        } else {
            $scope.reloadBool = true;
            $(document).ready(function () {
                $('#itconsultantbar').removeClass('progress-bar-reload-disabled');
            });
        }
        console.log("autoReload: " + $scope.reloadBool);
    }
    $scope.$on("$destroy", function () {
        // clean up autoReload interval
        console.log("stopped ItConsultant autoReload: " + $interval.cancel(timer));
    });
});

app.controller('itConsultantDetailsController', function (notice, $scope, $http, $location, $routeParams, $route) {
	var stringMessage = "";
	var getImg = "";
    var getCV = "";

    $scope.itConsultantCustomId = $routeParams.id;
    $http({
        method: 'GET',
        url: itconsultantResourceApi + $scope.itConsultantCustomId
    }).then(function (response) {
        $scope.itConsultantCustom = response.data;
        getImg = $scope.itConsultantCustom.imgpath;
        getCV = $scope.itConsultantCustom.cvExternalPath;
        console.log($scope.itConsultantCustom);
    });

    $scope.itConsultantCustom = {
        userId: "",
        domicileCity: "",
        domicileStreetName: "",
        domicileHouseNumber: "",
        studyQualification: "",
        graduate: "",
        highGraduate: "",
        stillHighStudy: "",
        mobile: "",
        cvExternalPath: null,
        email: "",
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        note: "",
        imgpath: null,
        oldImg: null,
        oldCV: null,

        files: []
    }
    
    var myText = document.getElementById("myText");
    var wordCount = document.getElementById("wordCount");
    $scope.notelengthmax = notelengthmax;
    
    $scope.itConsultantCustom.note = myText.addEventListener("keyup",function(){
    	var characters = myText.value.split('');
      wordCount.innerText = "Caratteri rimanenti: " + (notelengthmax - characters.length); 
    }); 

    $scope.submitUserForm = function () {

        console.log("getImg " + getImg);
        console.log("getCV " + getCV);

        if ($scope.validateEditForm()) {
            var data = new FormData();

            data
                .append("userId",
                    $scope.itConsultantCustom.userId);
            console.log("$scope.itConsultantCustom.userId " +
                $scope.itConsultantCustom.userId);

            data.append("domicileCity",
                $scope.itConsultantCustom.domicileCity);
            data.append("domicileStreetName",
                $scope.itConsultantCustom.domicileStreetName);
            data.append("domicileHouseNumber",
                $scope.itConsultantCustom.domicileHouseNumber);
            data.append("studyQualification",
                $scope.itConsultantCustom.studyQualification);

            if ($scope.itConsultantCustom.graduate == null) {
                data.append("graduate", false);
            } else {
                data.append("graduate",
                    $scope.itConsultantCustom.graduate);
                console.log("graduate" +
                    $scope.itConsultantCustom.graduate);
            }

            if ($scope.itConsultantCustom.highGraduate == null) {
                data.append("highGraduate", false);
            } else {
                data.append("highGraduate",
                    $scope.itConsultantCustom.highGraduate);
                console.log("highGraduate" +
                    $scope.itConsultantCustom.highGraduate);
            }

            if ($scope.itConsultantCustom.stillHighStudy == null) {
                data.append("stillHighStudy", false);
            } else {
                data.append("stillHighStudy",
                    $scope.itConsultantCustom.stillHighStudy);
                console
                    .log("stillHighStudy" +
                        $scope.itConsultantCustom.stillHighStudy);
            }

            data
                .append("mobile",
                    $scope.itConsultantCustom.mobile);
            data.append("email", $scope.itConsultantCustom.email);
            data.append("firstname",
                $scope.itConsultantCustom.firstname);
            data.append("lastname",
                $scope.itConsultantCustom.lastname);

            console.log("$scope.itConsultantCustom.dateOfBirth " +
                $scope.itConsultantCustom.dateOfBirth); // old
            // dateOfBirth
            console.log("$scope.dateOfBirth : " +
                $scope.dateOfBirth); // new dateOfBirth

            if ($scope.dateOfBirth == null) {

                // var inputDate =
                // $scope.itConsultantCustom.dateOfBirth;
                // var d = new Date(inputDate);
                // console.log("inputDate " + d);
                // data.append("dateOfBirth", d);
            } else {

                var inputDate = $scope.dateOfBirth;
                var d = new Date(inputDate);
                console.log("inputDate " + d);
                data.append("dateOfBirth", d);
            }

            data.append("oldImg", getImg);
            data.append("oldCV", getCV);

            console.log("oldImg " + getImg);
            console.log("oldCV " + getCV);

            console.log("$scope.itConsultantCustom.files" +
                $scope.itConsultantCustom.files);
            var fileIsPresent = $scope.itConsultantCustom.files;

            if (fileIsPresent) {

                if (typeof ($scope.itConsultantCustom.files[0]) != "undefined") {
                    console
                        .log("Filesname0 IMG IS PRESENT " +
                            $scope.itConsultantCustom.files[0].name);
                    data.append("files",
                        $scope.itConsultantCustom.files[0]);
                    data
                        .append(
                            "imgpath",
                            $scope.itConsultantCustom.files[0].name);
                } else {
                    data.append("imgpath", null);
                }

                if (typeof ($scope.itConsultantCustom.files[1]) != "undefined") {
                    console
                        .log("Filesname1 CV IS PRESENT" +
                            $scope.itConsultantCustom.files[1].name);
                    data.append("files",
                        $scope.itConsultantCustom.files[1]);
                    data
                        .append(
                            "cvExternalPath",
                            $scope.itConsultantCustom.files[1].name);
                } else {
                    data.append("cvExternalPath", null);
                }

            }

            var config = {
                transformRequest: angular.identity,
                transformResponse: angular.identity,
                headers: {
                    'Content-Type': undefined

                }
            }

            $http.put(
                itconsultantResourceApi +
                $scope.itConsultantCustomId, data,
                config).then(
                // Success
                function (response) {
                    console.log(data);
                    $location.path("/list-all-itconsultants");
                    $route.reload();
                    notice.success();
                },
                
                
                // Error
                function (response) {
                    $scope.uploadResult = response.data;
                    console.log(response);
                    if (response.status == 500)
                        notice.database();
                    else
                        notice.error(response.data.errorMessage);                      
                });
        } else {
            notice.error(stringMessage);
        }

    }

    $scope.validateEditForm = function () {
        console.log("validateForm START");
        var validating = true ;
        
        var firstnameTmp = $scope.itConsultantCustom.firstname;
        console.log("firstnameTmp: " + firstnameTmp);
        if (firstnameTmp == undefined || firstnameTmp == null || firstnameTmp == "") {
        	stringMessage = "inserisci un nome valido";
           // return false;
            validating = false ;
        }

        var lastnameTmp = $scope.itConsultantCustom.lastname;
        console.log("firstnameTmp: " + lastnameTmp);
        if (lastnameTmp == undefined || lastnameTmp == null || lastnameTmp == "") {
        	stringMessage = "inserisci un cognome valido";
           // return false;
            validating = false ;
        }

        var emailTmp = $scope.itConsultantCustom.email;
        console.log("emailTmp: " + emailTmp);
        if (emailTmp == undefined || emailTmp == null || emailTmp == "") {
        	stringMessage = "inserisci una mail valida";
            validating = false ;
        }

//        var domicileCityTmp = $scope.itConsultantCustom.domicileCity;
//        console.log("domicileCityTmp: " + domicileCityTmp);
//        if (domicileCityTmp == undefined || domicileCityTmp == null || domicileCityTmp == "") {
//        	stringMessage = "inserisci il tuo domicilio";
//            validating = false ;
//        }
//        
//        var domicileStreetNameTmp = $scope.itConsultantCustom.domicileStreetName;
//        console.log("domicileStreetNameTmp: " + domicileStreetNameTmp);
//        if (domicileStreetNameTmp == undefined ||
//            domicileStreetNameTmp == null ||
//            domicileStreetNameTmp == "") {
//            stringMessage = "inserisci la via del domicilio";
//            return false;
//        }
//
//        var domicileHouseNumberTmp = $scope.itConsultantCustom.domicileHouseNumber;
//        console.log("domicileHouseNumberTmp: " + domicileHouseNumberTmp);
//        if (domicileHouseNumberTmp == undefined ||
//            domicileHouseNumberTmp == null ||
//            domicileHouseNumberTmp == "") {
//            stringMessage = "inserisci il numero civico della via";
//            return false;
//        }
//
//
//        var studyQualificationTmp = $scope.itConsultantCustom.studyQualification;
//        console.log("studyQualificationTmp: " +
//            studyQualificationTmp);
//        if (studyQualificationTmp == undefined || studyQualificationTmp == null || studyQualificationTmp == "") {
//        	stringMessage = "inserisci il tuo titolo di studio";
//            validating = false ;
//        }
        
        var mobileTmp = $scope.itConsultantCustom.mobile;
        console.log("mobileTmp: " + mobileTmp);
        if (mobileTmp != null) {
            var mobileStr = mobileTmp.toString();
            console.log("mobileTmp.length: " + mobileStr.length + " mobileStr " + mobileStr);
            if (mobileStr.length > 0 && mobileStr.length < 9) {
                console.log("mobileTmp2: " + mobileTmp);
                stringMessage = "lunghezza numero cellulare minima 9";
                return false;
            }
        }
            
        console.log("validateForm END --> true");
        return validating ;
    }; 
    //return false;
});