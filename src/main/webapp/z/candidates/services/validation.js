app.service('validationService', function($rootScope) {
	this.stringMessage = "";
	this.validateForm =  function () {
		        console.log("validateForm START");
		        
		        $rootScope.myForm = {
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

		        var firstnameTmp = $rootScope.myForm.firstname;
		        console.log("firstnameTmp: " + firstnameTmp);

		        if (firstnameTmp == undefined || firstnameTmp == null || firstnameTmp.length == 0) {
		            stringMessage = "inserisci un nome valido";
		            return false;
		        }

		        var lastnameTmp = $rootScope.myForm.lastname;
		        console.log("firstnameTmp: " + lastnameTmp);

		        if (lastnameTmp == undefined || lastnameTmp == null || lastnameTmp.length == 0) {
		            stringMessage = "inserisci un cognome valido";
		            return false;
		        }

		        var courseCodeTmp = $rootScope.myForm.courseCode;
		        console.log("courseCodeTmp: " + courseCodeTmp);

		        if (courseCodeTmp == undefined || courseCodeTmp == null) {
		            stringMessage = "inserisci un coodice";
		            return false;
		        }

		        var emailTmp = $rootScope.myForm.email;
		        console.log("emailTmp: " + emailTmp);
		        if (emailTmp == undefined || emailTmp == null || emailTmp.length == 0) {
		            stringMessage = "inserisci un email valida";
		            return false;
		        }

//		        var domicileCityTmp = $scope.myForm.domicileCity;
//		        console.log("domicileCityTmp: " + domicileCityTmp);
//		        if (domicileCityTmp == undefined ||
//		            domicileCityTmp == null ||
//		            domicileCityTmp == "") {
//		            stringMessage = "inserisci un domicilio";
//		            return false;
//		        }
		//
//		        var domicileStreetNameTmp = $scope.myForm.domicileStreetName;
//		        console.log("domicileStreetNameTmp: " + domicileStreetNameTmp);
//		        if (domicileStreetNameTmp == undefined ||
//		            domicileStreetNameTmp == null ||
//		            domicileStreetNameTmp == "") {
//		            stringMessage = "inserisci la via del domicilio";
//		            return false;
//		        }
		//
//		        var domicileHouseNumberTmp = $scope.myForm.domicileHouseNumber;
//		        console.log("domicileHouseNumberTmp: " + domicileHouseNumberTmp);
//		        if (domicileHouseNumberTmp == undefined ||
//		            domicileHouseNumberTmp == null ||
//		            domicileHouseNumberTmp == "") {
//		            stringMessage = "inserisci il numero civico della via";
//		            return false;
//		        }
		//
//		        var studyQualificationTmp = $scope.myForm.studyQualification;
//		        console.log("studyQualificationTmp: " +
//		            studyQualificationTmp);
//		        if (studyQualificationTmp == undefined ||
//		            studyQualificationTmp == null ||
//		            studyQualificationTmp == "") {
//		            stringMessage = "inserisci un titolo di studio";
//		            return false;
//		        }
		//
		        var mobileTmp = $rootScope.myForm.mobile;
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