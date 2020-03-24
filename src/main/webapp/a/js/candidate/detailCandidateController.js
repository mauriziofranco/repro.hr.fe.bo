app.controller('detailCandidateController', function (notice, $scope, $http, $location, $routeParams, $route) {
    var getImg = "";
    var getCV = "";
    $scope.uploadResult = "";
    var stringMessage = "";
    var getCandState = "";
    
    //var currentStateSelected = "" ;
  
    //Chiamata Rest per i candidateStates
     $http({
		method:'GET',
		url:candidateStatesApi
	}).then(function(response){	
		$scope.states=(response.data);
		console.log("x1 - $scope.candidateCustom.candidateStatesId: "+ $scope.candidateCustom.candidateStatesId);
		if (($scope.candidateCustom.candidateStatesId!=undefined)&&($scope.candidateCustom.candidateStatesId!=null)) {
			console.log("x2 - $scope.candidateCustom.candidateStatesId: "+ $scope.candidateCustom.candidateStatesId);	
			for (var i=0; i<$scope.states.length;i++) {
	        	if ($scope.candidateCustom.candidateStatesId==$scope.states[i].id){
	        		$scope.selected = $scope.states[i];	
	        		console.log("x3 - $scope.states[i]: "+ $scope.states[i] + " - with i: " + i);
	        	}
	        }
//	        console.log("x6 - currentStateSelected.id: "+ currentStateSelected.id);
//			$scope.selected = $scope.states[5]; 
		}
		console.log("States Controllo Seba Start-----------------");
	},function(errResponse) {
		console.log(errResponse.data);
		console.log("() end");
	});
    //end della chiamata Rest per i candidateStates
    
    console.log("detailCandidateController invoke")
    $scope.candidateCustomId = $routeParams.id;
    
    
    
    $http({
        method: 'GET',
        url: candidateResourceApi2 + $scope.candidateCustomId
    }).then(function (response) {
        $scope.candidateCustom = response.data;
        getImg = $scope.candidateCustom.imgpath;
        getCV = $scope.candidateCustom.cvExternalPath;
        getCandState = $scope.candidateCustom.id;
        console.log("x4 - $scope.candidateCustom.candidateStatesId: "+ $scope.candidateCustom.candidateStatesId);
		if (($scope.candidateCustom.candidateStatesId!=undefined)&&($scope.candidateCustom.candidateStatesId!=null)) {
			console.log("x5 - $scope.candidateCustom.candidateStatesId: "+ $scope.candidateCustom.candidateStatesId);	
			for (var i=0; i<$scope.states.length;i++) {
	        	if ($scope.candidateCustom.candidateStatesId==$scope.states[i].id){
	        		$scope.selected = $scope.states[i];	
	        		console.log("x6 - $scope.states[i]: "+ $scope.states[i] + " - with i: " + i);
	        	}
	        }
//	        console.log("x6 - currentStateSelected.id: "+ currentStateSelected.id);
//			$scope.selected = $scope.states[5]; 
		}
        console.log("BEGIN : Stampa di verifica candidateCustom:-------------------------------------");
        console.log($scope.candidateCustom);
        console.log("END   : Stampa di verifica candidateCustom:-------------------------------------");
        
        console.log("detailCandidateController - candidateCustom: "+$scope.candidateCustom);
        //seba controlli
        
    });
    //$scope.selected = currentStateSelected;
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
        oldCandStat:null,
//        currentStateSelected:currentStateSelected,
        candidateStatesId:null,
        //add by Seba campo buono
        candidateStatusColor:"",
        //add by Seba

        files: []
    
    	
    }

    $scope.submitUserForm = function () {

        console.log("getImg " + getImg);
        console.log("getCV " + getCV);
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
            
            data.append("note",
                    $scope.candidateCustom.note);

            console.log("$scope.candidateCustom.dateOfBirth " +
                $scope.candidateCustom.dateOfBirth); // old
            // dateOfBirth
            console.log("$scope.dateOfBirth : " +
                $scope.dateOfBirth); // new dateOfBirth

            if ($scope.dateOfBirth == null) {

                // var inputDate =
                // $scope.candidateCustom.dateOfBirth;
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
            //add by Seba
            data.append("oldCandStat", getCandState);
            //add by Seba
//            data.append("candidateStatusColor",myForm.states);

            console.log("oldImg " + getImg);
            console.log("oldCV " + getCV);
//            console.log("candidateStatesId: " + $scope.candidateCustom.candidateStatesId);
            console.log("XXXXXX $scope.candidateCustom.candidateStatesId" + $scope.candidateCustom.candidateStatesId + "$scope.selected " + $scope.selected);
            console.log($scope.selected);
//            console.log(JSON.stringify($scope.selected));
//            console.log("currentStateSelected: " + currentStateSelected);
            //console.log("currentStateSelected.id: "+ currentStateSelected.id);
//            data.append("candidateStatesId", $scope.candidateCustom.candidateStatesId);
            data.append("candidateStatesId", $scope.selected.id);
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
        console.log($scope.candidateCustom);
        console.log($scope.selected);
        var firstnameTmp = $scope.candidateCustom.firstname;
//        console.log("firstnameTmp: " + firstnameTmp);

        if (firstnameTmp == undefined || firstnameTmp == null ||
            firstnameTmp == "") {
        	stringMessage = "inserisci un nome valido";
            return false;
        }

        var lastnameTmp = $scope.candidateCustom.lastname;
//        console.log("firstnameTmp: " + lastnameTmp);

        if (lastnameTmp == undefined || lastnameTmp == null ||
            lastnameTmp == "") {
        	stringMessage = "inserisci un cognome valido";
            return false;
        }
        
        var emailTmp = $scope.candidateCustom.email;
//        console.log("emailTmp: " + emailTmp);
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
//        console.log("mobileTmp: " + mobileTmp);
        if (mobileTmp != null) {
            var mobileStr = mobileTmp.toString();
            console.log("mobileTmp.length: " + mobileStr.length + " mobileStr " + mobileStr);
            if (mobileStr.length > 0 && mobileStr.length < 9) {
//                console.log("mobileTmp2: " + mobileTmp);
                stringMessage = "lunghezza numero cellulare minima 9";
                return false;
            }
        }

        console.log("validateForm END --> true");
        return true;
    };
    
    var myText = document.getElementById("myText");
    var wordCount = document.getElementById("wordCount");
    $scope.notelengthmax = notelengthmax; 
    
    $scope.candidateCustom.note = myText.addEventListener("keyup",function(){
    	var characters = myText.value.split('');
      wordCount.innerText = "Caratteri rimanenti: " + (notelengthmax - characters.length); 
    });

});
