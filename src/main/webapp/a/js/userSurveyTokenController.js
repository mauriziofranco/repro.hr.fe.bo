var relativePath = MAIN_BACKEND_LOCATION+'/api/v1' ;

var userSurveyTokenResourceApi = relativePath+'/usersurveytokencustom/';
var userResourceApi = relativePath+'/user/javacoursecandidate/';
var surveyResourceApi = relativePath+'/survey/';
var userSurveyTokenAppResourceApi = relativePath+'/usersurveytoken/';
var sendEmailPartialResourceApi = 'sendEmail/'

app.controller('insertUserSurveyTokenController', function(notice, $scope,
		$http, $location, $route) {

	// getAllUsers for selectTag
	$http({
		method : 'GET',
		url : userResourceApi
	}).then(function(response) {
		$scope.users = response.data;
	});

	// getAllSurvey for selectTag
	$http({
		method : 'GET',
		url : surveyResourceApi
	}).then(function(response) {
		$scope.surveys = response.data;
	});

	$scope.submitUserForm = function() {
		console.log("user id: " + $scope.userToken);
		console.log("survey id: " + $scope.surveyToken);
		console.log($scope.expirationdate);

		var data = {
			"userid" : $scope.userToken,
			"surveyid" : $scope.surveyToken,
			"expirationdate" : $scope.expirationdate
		// + "T00:00:00" statusCode 400
		};
		console.log(data);
		$http({
			method : 'POST',
			url : userSurveyTokenAppResourceApi,
			data : data,

		}).then(function(response) {
			$location.path("/list-all-usersurveytoken");
			console.log(data);
			$route.reload();
			notice.success();
		}, function(errResponse) {
            if(errResponse.status==500)
            	notice.database();
            else
            	notice.error(errResponse.data.errorMessage);
		});
	}
	$scope.resetForm = function() {
		$scope.userToken = null;
		$scope.surveyToken = null;
		$scope.expirationdate = null;
	};
});

app.controller('listUserSurveyTokenController', function(notice, $scope, $http,
		$location, $route, $interval) {
	
	$scope.dataActive = {
			availableOptions: [
			      {id: '1', value: '5',size:5},
			      {id: '2', value: '10',size:10},
			      {id: '3', value: '50',size:50},
			      {id: '4', value: '100',size:100},
			   ],
			   selectedOption: {id: '1', value: '5', size:5} //This sets the default value of the select in the ui
	};
	
	$scope.dataExpired = {
			availableOptions: [
			      {id: '1', value: '5',size:5},
			      {id: '2', value: '10',size:10},
			      {id: '3', value: '50',size:50},
			      {id: '4', value: '100',size:100},
			   ],
			   selectedOption: {id: '1', value: '5', size:5} //This sets the default value of the select in the ui
	 };
	
	 $scope.currentPageActive=1;
	 $scope.currentPageExpired=1;
	 $scope.totalPagesActive = 1;
	 $scope.totalPagesExpired = 1;
	 $scope.pageSizeActive=$scope.dataActive.selectedOption.size;
	 $scope.pageSizeExpired=$scope.dataExpired.selectedOption.size;
	 
	 function listUSTokenActive(){
			console.log("list UserSurveyToken active invoked");
			var currentPage = $scope.currentPageActive -1;
			$http({
				method : 'GET',
				url : userSurveyTokenResourceApi+"active/"+$scope.pageSizeActive+"/"+currentPage+"/"
			}).then(function(response) {
				$scope.listActive = response.data.content;
				if(response.data.totalPages!= null)
					$scope.totalPagesActive = response.data.totalPages;
				else
					$scope.totalPagesActive = 1;
			});
		}
		
		function listUSTokenExpired(){
			console.log("list UserSurveyToken expired invoked");
			var currentPage = $scope.currentPageExpired -1;
			$http({
				method : 'GET',
				url : userSurveyTokenResourceApi+"expired/"+$scope.pageSizeExpired+"/"+currentPage+"/"
			}).then(function(response) {
				$scope.listExpired = response.data.content;
				if(response.data.totalPages!= null)
					$scope.totalPagesExpired = response.data.totalPages;
				else
					$scope.totalPagesExpired = 1;
			});
		}
		
	 function listUSToken(situation) {
		 Pace.restart();
		 if(situation)
			 listUSTokenExpired();
		 else
			 listUSTokenActive();
	 }
	 
	 $scope.getItemsActive = function() {
		 $scope.currentPageActive=1;
		 $scope.pageSizeActive=$scope.dataActive.selectedOption.size;
		 console.log("pageSize active "+ $scope.pageSizeActive);
		 listUSToken(false);
	 }
	 
	 $scope.getItemsExpired = function() {
		 $scope.currentPageExpired=1;
		 $scope.pageSizeExpired=$scope.dataExpired.selectedOption.size;
		 console.log("pageSize expired "+ $scope.pageSizeExpired);
		 listUSToken(true);
	 }
	 
	 $scope.nextPageActive = function(){
	    $scope.currentPageActive+=1;
		 listUSToken(false);
	 };
	 $scope.prevPageActive = function(){
	    $scope.currentPageActive-=1;
		listUSToken(false);
	 };
	    
	 $scope.nextPageExpired = function(){
	    $scope.currentPageExpired+=1;
		listUSToken(true);
	 };
	 $scope.prevPageExpired = function(){
	    $scope.currentPageExpired-=1;
		listUSToken(true);
	 };
	
	$scope.deleteUserSurveyToken = function(userSurveyTokenId)  {
		
		$http({
			method : 'DELETE',
			url : userSurveyTokenAppResourceApi + userSurveyTokenId
		}).then(function(response) {
			$location.path("/list-all-usersurveytoken");
			reload();
			notice.success();
        },
        function (response) {
            $scope.uploadResult = response.data;
            console.log(response);
            if(response.status==500)
            	notice.database();
            else
            	notice.error(response.data.errorMessage);

		});
	}
	$scope.sendEmail = function(userSurveyTokenId) {
		$http({
			method : 'GET',
			url : userSurveyTokenAppResourceApi + sendEmailPartialResourceApi + userSurveyTokenId
		}).then(function(response) {
			$location.path("/list-all-usersurveytoken");
			reload();
			notice.success();
        },
        function (response) {
            $scope.uploadResult = response.data;
            console.log(response);
            if(response.status==500)
            	notice.database();
            else
            	notice.error(response.data.errorMessage);

		});
	}
	$scope.reloadBool = true;
	$scope.reloadUSToken = 0;

	function incrSec() {
		if ($scope.reloadBool) {
//			console.log("autoReload: " + $scope.reloadBool);
			$scope.reloadUSToken += 10;
			if ($scope.reloadUSToken > 100) {
				$scope.reloadUSToken = 0;
				reload();
			}
		}
	}
	timer = $interval(incrSec, 1000);
	function reload() {
		Pace.restart();
		$scope.reloadUSToken = 0;
		listUSTokenActive();
		listUSTokenExpired();
	}
	$scope.listUSToken = function() {
		reload();
	}
	reload();
	$scope.autoReload = function autoReload() {
		if ($scope.reloadBool) {
			$scope.reloadBool = false;
			$(document).ready(function() {
				$('#ustokenbar').addClass('progress-bar-reload-disabled');
				$('#ustokenexpiredbar').addClass('progress-bar-reload-disabled');
			});
		} else {
			$scope.reloadBool = true;
			$(document).ready(function() {
				$('#ustokenbar').removeClass('progress-bar-reload-disabled');
				$('#ustokenexpiredbar').removeClass('progress-bar-reload-disabled');
			});
		}
		console.log("autoReload: " + $scope.reloadBool);
	}
	$scope.$on("$destroy", function() {
        // clean up autoReload interval
		console.log("stopped USToken autoReload: " + $interval.cancel(timer));
    });
});