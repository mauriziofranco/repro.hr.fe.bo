app.controller('smartRegisterCandidateController', function (notice, $scope, $http, $location, $route) {
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


        if ($scope.validateForm()) {

            var data = new FormData();

            data.append("email", $scope.myForm.email);
            data.append("firstname", $scope.myForm.firstname);
            data.append("lastname", $scope.myForm.lastname);

            if (typeof ($scope.myForm.files[0]) != "undefined") {
                console.log("filesname0 " +
                    $scope.myForm.files[0].name);
                data.append("files", $scope.myForm.files[0]);
                data.append("cvExternalPath",
                    $scope.myForm.files[0].name);
            }

            var config = {
                transformRequest: angular.identity,
                transformResponse: angular.identity,
                headers: {
                    'Content-Type': undefined

                }
            }

            $http
                .post(candidateResourceApi2, data, config)
                .then(
                    // Success
                    function (response) {
                        $scope.uploadResult = response.data;
                        console.log(data);
                        $location
                            .path("/list-all-candidates");
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

        console.log("validateForm END --> true");
        return true;
    };
});