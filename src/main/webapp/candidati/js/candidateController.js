var candidateResourceApi = '/centauri.be/api/v1/candidatecustom/';
var timeNotice = 2000; // time in milliseconds (1000 = 1sec)

app.controller('registerUserController', function (notice, $scope, $http, $location, $route) {
//	if ( $location.search().hasOwnProperty( 'xxx' ) ) {
//	   var myvalue = $location.search()['xxx'];
//	   // 'myvalue' now stores '33'
//	   console.log("xxx = " + myvalue);
//	}
	var courseCode = getParameterByName('courseCode');
	console.log("courseCode = "+courseCode);
    $scope.uploadResult = "";
    $scope.step=1;
    var stringMessage = "";
    //  domicileCity":"","domicileStreetName":"","domicileHouseNumber":"","studyQualification":"","graduate":false,"highGraduate":false,"stillHighStudy":false,"mobile":"","cvExternalPath":"","email":"1@2.3","firstname":"bbb","lastname":"aaa","dateOfBirth":"2018-11-01","imgpath":null}]
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
        courseCode: courseCode,
        note: "",
        files: []
    }

    
    $scope.nextStep = function () {
    	$scope.step++;
    }
    $scope.previousStep = function () {
    	$scope.step--;
    }
    
    $scope.goToStep = function (stepNumber) {
    	$scope.step=stepNumber;
    }
    
    $scope.submitUserForm = function () {

        // var url = "/rest/uploadMultiFiles";

        if ($scope.validateForm()) {

            var data = new FormData();
                       
            data.append("domicileCity", $scope.myForm.domicileCity);
            data.append("domicileStreetName", $scope.myForm.domicileStreetName);
            data.append("domicileHouseNumber", $scope.myForm.domicileHouseNumber);
            data.append("studyQualification", $scope.myForm.studyQualification);
            data.append("courseCode", $scope.myForm.courseCode);
//            data.append("note", $scope.myForm.note);

            var graduateTmp = $scope.myForm.graduate;
            console.log("graduateTmp: " + graduateTmp);
            if (graduateTmp == undefined || graduateTmp == null || graduateTmp == "") {
                data.append("graduate", false);
            } else {
                data.append("graduate", $scope.myForm.graduate);
            }

            var highGraduateTmp = $scope.myForm.highGraduate;
            console.log("graduateTmp: " + highGraduateTmp);
            if (highGraduateTmp == undefined || highGraduateTmp == null || highGraduateTmp == "") {
                data.append("highGraduate", false);
            } else {
                data.append("highGraduate", $scope.myForm.highGraduate);
            }

            var stillHighStudyTmp = $scope.myForm.stillHighStudy;
            console.log("graduateTmp: " + stillHighStudyTmp);
            if (stillHighStudyTmp == undefined || stillHighStudyTmp == null || stillHighStudyTmp == "") {
                data.append("stillHighStudy", false);
            } else {
                data.append("stillHighStudy", $scope.myForm.stillHighStudy);
            }

            data.append("mobile", $scope.myForm.mobile);
            data.append("email", $scope.myForm.email);
            data.append("firstname", $scope.myForm.firstname);
            data.append("lastname", $scope.myForm.lastname);

            var dateOfBirth = $scope.myForm.dateOfBirth;
            console.log("dateOfBirth: " + dateOfBirth);
            if (dateOfBirth == undefined || dateOfBirth == null || dateOfBirth.length == 0) {
                dateOfBirth = new Date("11/11/1111");
                console.log("FakedateOfBirth: " + dateOfBirth);
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
                .post(candidateResourceApi, data, config)
                .then(
                    // Success
                    function (response) {
                        $scope.uploadResult = response.data;
                        console.log(data);
                        $location.path("/success-page");
                        $route.reload();
                    },
                    // Error
                    function (response) {
                        $scope.uploadResult = response.data;
                        console.log(response);
//                        if (response.status == 500) {
//                            $location.path("/warn-page");
//                            $route.reload();
//                        } else {
                            $location.path("/error-page");
                            $route.reload();
//                        }


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

        
        
        if (firstnameTmp == undefined || firstnameTmp == null || firstnameTmp.length == 0) {
            stringMessage = "inserisci un nome valido";
            return false;
        }

        var lastnameTmp = $scope.myForm.lastname;
        console.log("firstnameTmp: " + lastnameTmp);

        if (lastnameTmp == undefined || lastnameTmp == null || lastnameTmp.length == 0) {
            stringMessage = "inserisci un cognome valido";
            return false;
        }

        var emailTmp = $scope.myForm.email;
        console.log("emailTmp: " + emailTmp);
        if (emailTmp == undefined || emailTmp == null || emailTmp.length == 0) {
            stringMessage = "inserisci un email valida";
            return false;
        }
        
        var domicileTmp = $scope.myForm.domicileCity ;
        if (domicileTmp == undefined || domicileTmp == null || domicileTmp.length == 0) {
        	stringMessage = "Domicilio obbligatorio. Inserisci la città nella quale sei domiciliato.";
            return false;
        }

        var mobileTmp = $scope.myForm.mobile;
        console.log("mobileTmp: " + mobileTmp);
        if (mobileTmp != null){
//        	try {
        		if (!isNaN(mobileTmp)) {
	        		var mobileStr = mobileTmp.toString();
	                console.log("mobileTmp.length: " + mobileStr.length +" mobileStr "+mobileStr);
	                if (mobileStr.length != 10 && mobileStr.length != 9 ) {
	                    console.log("mobileTmp2: " + mobileTmp);
	                    stringMessage = "Il numero di cellulare inserito non è corretto.";
	                    return false;
	                }
        		} else {
        			stringMessage = "Il numero di cellulare inserito non è corretto..";
                    return false;
        		}
//        	} catch(err) {
//                document.getElementById("demo").innerHTML = err.message;
//        	}
            
         }
      

        console.log("validateForm END --> true");
        return true;
    };
});

