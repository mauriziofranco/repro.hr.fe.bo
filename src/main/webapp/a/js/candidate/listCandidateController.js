app.controller('listCandidateController', function(notice, $scope, $http, $location,
		$route, $interval, $routeParams, $rootScope) {
	$scope.courseCode = $routeParams.code;
	console.log($scope.courseCode);
	
	$http({
		method:'GET',
		url:courseResourceApi2
	}).then(function(response){
		//$scope.names=(response.data);
		$rootScope.codes=(response.data);
		console.log( $scope.codes);
		
		console.log("Controlli Seba UserList response.data");
		console.log(response.data);
		
		
		//console.log("$scope.names[0].code: " + $scope.names[0].code);
//		console.log("$rootScope.names[0].code: " + $rootScope.names[0].code);
	},function(errResponse) {
		console.log(errResponse.data);
		console.log("() end");
	});
	
		
	// $scope.imgFullPath = "http://centauri.proximainformatica.com/canimg/";
	$scope.imgFullPath = "../../canimg/";
	// $scope.cvFullPath = "http://centauri.proximainformatica.com/cancv/";
	$scope.cvFullPath = "../../cancv/";


    function listCandidate(courseCode) {
        console.log("list Candidate invoked with courseCode: " + courseCode);
        Pace.restart();
        var currentPage = $scope.currentPage - 1;
        if (courseCode==undefined)courseCode="";
        $http({
            method: 'GET',
            url: candidateResourceApi2 + "paginated/" + $scope.pageSize + "/" + currentPage + "/" + courseCode
        }).then(function (response) {
            $scope.list = response.data.content;
            if (response.data.totalPages != null)
                $scope.totalPages = response.data.totalPages;
            else
            	$scope.totalPages = 1;
            
            
            console.log("Controlli Seba listCandidate");
    		console.log("Response:");
    		console.log(response);
    		console.log("List:");
    		console.log($scope.list);
        });
    }
    $scope.editCandidateCustom = function (candidateCustomId) {
        $location.path("/update-candidate/" + candidateCustomId);
    }
    $scope.deleteCandidateCustom = function (candidateCustomId) {
        $http({
            method: 'DELETE',
            url: candidateResourceApi2 + candidateCustomId
        }).then(function (response) {
                $location.path("/list-all-candidates");
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

    $scope.getCandidates = function () {
    	console.log("getCandidates - START");
        $scope.currentPage = 1;
        $scope.pageSize = $scope.data.selectedOption.size;
        listCandidate();
    }

    $scope.nextPage = function () {
        $scope.currentPage += 1;
        listCandidate();
    };

    $scope.prevPage = function () {
        $scope.currentPage -= 1;
        listCandidate();
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
    $scope.reloadCandidate = 0;
    

    function incrSec() {
        if ($scope.reloadBool) {
            //			console.log("autoReload: " + $scope.reloadBool);
            $scope.reloadCandidate += 10;
            if ($scope.reloadCandidate > 100) {
                $scope.reloadCandidate = 0;
                reload();
            }
        }
    }
    timer = $interval(incrSec, 1000);

    function reload() {
        $scope.reloadCandidate = 0;
        listCandidate($scope.courseCode);
    }
    $scope.listCand = function () {
        reload();
    }
    reload();
    $scope.autoReload = function autoReload() {
        if ($scope.reloadBool) {
            $scope.reloadBool = false;
            $(document).ready(function () {
                $('#candidatebar').addClass('progress-bar-reload-disabled');
            });
        } else {
            $scope.reloadBool = true;
            $(document).ready(function () {
                $('#candidatebar').removeClass('progress-bar-reload-disabled');
            });
        }
        console.log("autoReload: " + $scope.reloadBool);
    }
    $scope.$on("$destroy", function () {
        // clean up autoReload interval
        console.log("stopped Candidate autoReload: " + $interval.cancel(timer));
      
    
    });
 
       
});
