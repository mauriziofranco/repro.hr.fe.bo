var originSiteResourceApi = MAIN_BACKEND_LOCATION+'/api/v1/originsitescustom/';

app.controller('registerOriginSiteController', function (notice, $scope, $http, $location, $route) {
    $scope.uploadResult = "";
    var stringMessage = "";
    $scope.myForm = {
        description: "",
        imgpath: "",
        label: ""
    }

    $scope.submitUserForm = function () {

        if ($scope.validateForm()) {

            var data = new FormData();

            data.append("description",
                $scope.myForm.description);
            data.append("imgpath",
                $scope.myForm.imgpath);
            data.append("label",
                $scope.myForm.label);
            
            $http({
    			method : 'POST',
    			url : originSiteResourceApi,
    			contentType : 'application/json',
    			data : JSON.stringify($scope.myForm),
            }).then(
                    // Success
                    function (response) {
                        $scope.uploadResult = response.data;
                        console.log(data);
                        $location
                            .path("/list-all-originsites");
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

        var descriptionTmp = $scope.myForm.description;
        console.log("descriptionTmp: " + descriptionTmp);

        if (descriptionTmp == undefined || descriptionTmp == null || descriptionTmp.length == 0) {
            stringMessage = "inserisci una descrizione valida";
            return false;
        }

        var imgpathTmp = $scope.myForm.imgpath;
        console.log("imgpathTmp: " + imgpathTmp);

        if (imgpathTmp == undefined || imgpathTmp == null || imgpathTmp.length == 0) {
            stringMessage = "inserisci un path immagine valido";
            return false;
        }
        
        var labelTmp = $scope.myForm.label;
        console.log("labelTmp: " + labelTmp);

        if (labelTmp == undefined || labelTmp == null || labelTmp.length == 0) {
            stringMessage = "inserisci un'etichetta valida";
            return false;
        }

        console.log("validateForm END --> true");
        return true;
    };
});

app.controller('listOriginSiteController', function (notice, $scope, $http, $location,
    $route, $interval) {
    
    function listOriginSites() {
        console.log("list Origin Site invoked");
        Pace.restart();
        var currentPage = $scope.currentPage - 1;
        $http({
            method: 'GET',
            url: originSiteResourceApi + "paginated/" + $scope.pageSize + "/" + currentPage + "/"
        }).then(function (response) {
            $scope.list = response.data.content;
            if (response.data.totalPages != null)
                $scope.totalPages = response.data.totalPages;
            else
            	$scope.totalPages = 1;
        });
    }
    $scope.editOriginSite = function (originSiteId) {
        $location.path("/update-originsite/" + originSiteId);
    }
    $scope.deleteOriginSite = function (originSiteId) {
        $http({
            method: 'DELETE',
            url: originSiteResourceApi + originSiteId
        }).then(function (response) {
                $location.path("/list-all-originsites");
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

    $scope.getOriginSites = function () {
        $scope.currentPage = 1;
        $scope.pageSize = $scope.data.selectedOption.size;
        listOriginSites();
    }

    $scope.nextPage = function () {
        $scope.currentPage += 1;
        listOriginSites();
    };

    $scope.prevPage = function () {
        $scope.currentPage -= 1;
        listOriginSites();
    };

    //############initialization of the showed values
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
            id: '4',
            value: '100',
            size: 100
        } //This sets the default value of the select in the ui
    };

    $scope.totalPages = 1;
    $scope.pageSize = $scope.data.selectedOption.size;
    $scope.currentPage = 1;
    $scope.reloadBool = true;
    $scope.reloadOriginSites = 0;
    

    function incrSec() {
        if ($scope.reloadBool) {
            $scope.reloadOriginSites += 10;
            if ($scope.reloadOriginSites > 100) {
                $scope.reloadOriginSites = 0;
                reload();
            }
        }
    }
    timer = $interval(incrSec, 1000);

    function reload() {
        $scope.reloadOriginSites = 0;
        listOriginSites();
    }
    $scope.listOrigSit = function () {
        reload();
    }
    reload();
    $scope.autoReload = function autoReload() {
        if ($scope.reloadBool) {
            $scope.reloadBool = false;
            $(document).ready(function () {
                $('#originsitebar').addClass('progress-bar-reload-disabled');
            });
        } else {
            $scope.reloadBool = true;
            $(document).ready(function () {
                $('#originsitebar').removeClass('progress-bar-reload-disabled');
            });
        }
        console.log("autoReload: " + $scope.reloadBool);
    }
    $scope.$on("$destroy", function () {
        // clean up autoReload interval
        console.log("stopped OriginSiTE autoReload: " + $interval.cancel(timer));
      
    
    });
    $scope.listaSelect = function(code) {
		
//TODO
//			$location.path("localhost:8080/centauri/a/index.html#/list-all-originsites/"+code);
			
		
	}
       
});

app.controller('originSiteDetailsController', function (notice, $scope, $http, $location, $routeParams, $route) {

    $scope.originSiteId = $routeParams.id;
    $http({
        method: 'GET',
        url: originSiteResourceApi + $scope.originSiteId
    }).then(function (response) {
        $scope.originSite = response.data;
        console.log($scope.originSite);
    });

    $scope.originSiteForm = {
    		description: "",
            imgpath: "",
            label: ""
    }

    $scope.submitUserForm = function () {

        if ($scope.validateForm()) {
            var data = new FormData();

            data.append("description",
                    $scope.originSiteForm.description);
            console.log("$scope.originSiteForm.description " +
                $scope.originSiteForm.description);
            data.append("imgpath",
                $scope.originSiteForm.imgpath);
            console.log("$scope.originSiteForm.imgpath " +
                    $scope.originSiteForm.imgpath);

            if ($scope.originSiteForm.label == null) {
                data.append("label", false);
            } else {
                data.append("label",
                    $scope.originSiteForm.label);
                console.log("label" +
                    $scope.originSiteForm.label);
            }

            $http({
				method : 'PUT',
				url : originSiteResourceApi + $scope.originSiteId,
				data : $scope.originSite
			}).then(
                // Success
                function (response) {
                    console.log(data);
                    $location.path("/list-all-originsites");
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

        var descriptionTmp = $scope.originSiteForm.description;
        console.log("descriptionTmp: " + descriptionTmp);

        if (descriptionTmp == undefined || descriptionTmp == null || descriptionTmp.length == 0) {
            stringMessage = "inserisci una descrizione valida";
            return false;
        }

        var imgpathTmp = $scope.originSiteForm.imgpath;
        console.log("imgpathTmp: " + imgpathTmp);

        if (imgpathTmp == undefined || imgpathTmp == null || imgpathTmp.length == 0) {
            stringMessage = "inserisci un path immagine valido";
            return false;
        }
        
        var labelTmp = $scope.originSiteForm.label;
        console.log("labelTmp: " + labelTmp);

        if (labelTmp == undefined || labelTmp == null || labelTmp.length == 0) {
            stringMessage = "inserisci un'etichetta valida";
            return false;
        }

        console.log("validateForm END --> true");
        return true;
    };
});
