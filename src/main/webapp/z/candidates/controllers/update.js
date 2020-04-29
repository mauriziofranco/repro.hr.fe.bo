var candidateResourceApi2 = MAIN_BACKEND_LOCATION+'/api/v1/candidatecustom/';
var courseResourceApi2 = MAIN_BACKEND_LOCATION+'/api/v1/coursepage/codes';
var candidateStatesApi = MAIN_BACKEND_LOCATION+'/api/v1/candidateStates/';

app.controller('candidateDetailsController', function (notice, $scope, $http, $location, $routeParams, $route) {
	var stringMessage = "";
	var getImg = "";
    var getCV = "";
    var getCandState = "";
    $scope.uploadResult = "";
  
    //Chiamata Rest per i candidateStates
     $http({
		method:'GET',
		url:candidateStatesApi
	}).then(function(response){	
		$scope.states=(response.data);
		
		},function(errResponse) {
		console.log(errResponse.data);
		console.log("() end");
	});
    //end della chiamata Rest per i candidateStates
    
    console.log("candidateDetailsController invoke")
    $scope.candidateCustomId = $routeParams.id;
    
    $http({
        method: 'GET',
        url: candidateResourceApi2 + $scope.candidateCustomId
    }).then(function (response) {
        $scope.candidateCustom = response.data;
        getImg = $scope.candidateCustom.imgpath;
        getCV = $scope.candidateCustom.cvExternalPath;
        getCandState = $scope.candidateCustom.candidateStatesId;
        console.log("BEGIN : Stampa di verifica candidateCustom:-------------------------------------");
        console.log($scope.candidateCustom);
        console.log("END   : Stampa di verifica candidateCustom:-------------------------------------");
        
        console.log("candidateDetailsController - candidateCustom: "+$scope.candidateCustom);
        //seba controlli
        
    });
    
    $scope.candidateCustom = {
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
        note:"",
        imgpath: null,
        oldImg: null,
        oldCV: null,
        oldCandState:null,
        
        candidateStatesId: null,
        candidateSatusLabel: null,
        candidateStatusColor:"",

        files: []
    
    	
    }

    $scope.submitUserForm = function () {

        console.log("getImg " + getImg);
        console.log("getCV " + getCV);
//        alert ($scope.candidateCustom.candidateStateId);
        if ($scope.validateForm()) {
            var data = new FormData();

            data
                .append("userId",
                    $scope.candidateCustom.userId);
            console.log("$scope.candidateCustom.userId " +
                $scope.candidateCustom.userId);

            data.append("domicileCity",
                $scope.candidateCustom.domicileCity);
            data.append("domicileStreetName",
                $scope.candidateCustom.domicileStreetName);
            data.append("domicileHouseNumber",
                $scope.candidateCustom.domicileHouseNumber);
            data.append("studyQualification",
                $scope.candidateCustom.studyQualification);

            if ($scope.candidateCustom.graduate == null) {
                data.append("graduate", false);
            } else {
                data.append("graduate",
                    $scope.candidateCustom.graduate);
                console.log("graduate" +
                    $scope.candidateCustom.graduate);
            }

            if ($scope.candidateCustom.highGraduate == null) {
                data.append("highGraduate", false);
            } else {
                data.append("highGraduate",
                    $scope.candidateCustom.highGraduate);
                console.log("highGraduate" +
                    $scope.candidateCustom.highGraduate);
            }

            if ($scope.candidateCustom.stillHighStudy == null) {
                data.append("stillHighStudy", false);
            } else {
                data.append("stillHighStudy",
                    $scope.candidateCustom.stillHighStudy);
                console
                    .log("stillHighStudy" +
                        $scope.candidateCustom.stillHighStudy);
            }

            data.append("mobile", $scope.candidateCustom.mobile);
            data.append("email", $scope.candidateCustom.email);
            data.append("firstname",
                $scope.candidateCustom.firstname);
            data.append("lastname",
                $scope.candidateCustom.lastname);
            
            console.log("$scope.candidateCustom.dateOfBirth " +
                $scope.candidateCustom.dateOfBirth); // old
            // dateOfBirth
            console.log("$scope.dateOfBirth : " +
                $scope.dateOfBirth); // new dateOfBirth

            if ($scope.dateOfBirth == null) {

            } else {

                var inputDate = $scope.dateOfBirth;
                var d = new Date(inputDate);
                console.log("inputDate " + d);
                data.append("dateOfBirth", d);
            }

            data.append("oldImg", getImg);
            data.append("oldCV", getCV);
            data.append("oldCandState", getCandState);

            console.log("oldImg " + getImg);
            console.log("oldCV " + getCV);
            console.log("oldCandState " + getCandState);
            
            data.append("candidateStatesId", $scope.candidateCustom.candidateStatesId);
            console.log("candidateStatesId " + $scope.candidateCustom.candidateStatesId);
            
            console.log("$scope.candidateCustom.files" +
                $scope.candidateCustom.files);
            var fileIsPresent = $scope.candidateCustom.files;

            if (fileIsPresent) {

                if (typeof ($scope.candidateCustom.files[0]) != "undefined") {
                    console
                        .log("Filesname0 IMG IS PRESENT " +
                            $scope.candidateCustom.files[0].name);
                    data.append("files",
                        $scope.candidateCustom.files[0]);
                    data
                        .append(
                            "imgpath",
                            $scope.candidateCustom.files[0].name);
                } else {
                    data.append("imgpath", null);
                }

                if (typeof ($scope.candidateCustom.files[1]) != "undefined") {
                    console
                        .log("Filesname1 CV IS PRESENT" +
                            $scope.candidateCustom.files[1].name);
                    data.append("files",
                        $scope.candidateCustom.files[1]);
                    data
                        .append(
                            "cvExternalPath",
                            $scope.candidateCustom.files[1].name);
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
                candidateResourceApi2 +
                $scope.candidateCustomId, data,
                config).then(
                // Success
                function (response) {
                	$scope.uploadResult = response.data;
                    console.log(data);
                    
                    $location.path("/list-all-candidates");
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

    $scope.validateForm = function () {
        console.log("validateForm START");

        var firstnameTmp = $scope.candidateCustom.firstname;
        console.log("firstnameTmp: " + firstnameTmp);

        if (firstnameTmp == undefined || firstnameTmp == null ||
            firstnameTmp == "") {
        	stringMessage = "inserisci un nome valido";
            return false;
        }

        var lastnameTmp = $scope.candidateCustom.lastname;
        console.log("firstnameTmp: " + lastnameTmp);

        if (lastnameTmp == undefined || lastnameTmp == null ||
            lastnameTmp == "") {
        	stringMessage = "inserisci un cognome valido";
            return false;
        }
        
        var emailTmp = $scope.candidateCustom.email;
        console.log("emailTmp: " + emailTmp);
        if (emailTmp == undefined || emailTmp == null ||
            emailTmp == "") {
        	stringMessage = "inserisci una mail valida";
            return false;
        }
        
//        var domicileCityTmp = $scope.candidateCustom.domicileCity;
//        console.log("domicileCityTmp: " + domicileCityTmp);
//        if (domicileCityTmp == undefined ||
//            domicileCityTmp == null ||
//            domicileCityTmp == "") {
//            stringMessage = "inserisci un domicilio";
//            return false;
//        } 
//        
//      var domicileStreetNameTmp = $scope.candidateCustom.domicileStreetName;
//      console.log("domicileStreetNameTmp: " + domicileStreetNameTmp);
//      if (domicileStreetNameTmp == undefined ||
//          domicileStreetNameTmp == null ||
//          domicileStreetNameTmp == "") {
//          stringMessage = "inserisci la via del domicilio";
//          return false;
//      }
//
//      var domicileHouseNumberTmp = $scope.candidateCustom.domicileHouseNumber;
//      console.log("domicileHouseNumberTmp: " + domicileHouseNumberTmp);
//      if (domicileHouseNumberTmp == undefined ||
//          domicileHouseNumberTmp == null ||
//          domicileHouseNumberTmp == "") {
//          stringMessage = "inserisci il numero civico della via";
//          return false;
//      }
//
//      var studyQualificationTmp = $scope.candidateCustom.studyQualification;
//      console.log("studyQualificationTmp: " +
//          studyQualificationTmp);
//      if (studyQualificationTmp == undefined ||
//          studyQualificationTmp == null ||
//          studyQualificationTmp == "") {
//          stringMessage = "inserisci un titolo di studio";
//          return false;
//      }
        
        var mobileTmp = $scope.candidateCustom.mobile;
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
        return true;
    };
});