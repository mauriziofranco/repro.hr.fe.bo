var MessageResourceApi = MAIN_BACKEND_LOCATION+'/api/v1/message/';

app.controller('listMessageController', function (notice, $scope, $http, $location,
	    $route, $interval) {
//
	
	    function listAll() {
	        console.log("listAll invoked");
	        Pace.restart();
	        var currentPage = $scope.currentPage - 1;
	        var currentUrl = MessageResourceApi + "paginated/" + $scope.pageSize + "/" + currentPage + "/";
	        console.log("currentUrl: " + currentUrl);
	        $http({
	            method: 'GET',
	            url: MessageResourceApi
	        }).then(function (response) {
	        	console.log("1 - response.data: " + response.data);
	            $scope.list = response.data;
//	            if (response.data.totalPages != null)
//	                $scope.totalPages = response.data.totalPages;
//	            else
//	            	$scope.totalPages = 1;
	        });
	    }

	    $scope.editMessageCustom = function (MessageCustomId) {
	        $location.path("/update-message/" + MessageCustomId);
	    }
	    $scope.deleteMessageCustom = function (MessageCustomId) {
	        $http({
	            method: 'DELETE',
	            url: MessageResourceApi + MessageCustomId
	        }).then(function (response) {
	                $location.path("/list-all-message");
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

	    $scope.getMessage = function () {
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
	    $scope.reloadMessage = 0;
	    

	    function incrSec() {
	        if ($scope.reloadBool) {
	            //			console.log("autoReload: " + $scope.reloadBool);
	            $scope.reloadMessage += 10;
	            if ($scope.reloadMessage > 100) {
	                $scope.reloadMessage = 0;
	                reload();
	            }
	        }
	    }
	    timer = $interval(incrSec, 1000);

	    function reload() {
	        $scope.reloadMessage = 0;
	        listAll();
	    }
	    $scope.listMessage = function () {
	        reload();
	    }
	    reload();
	    $scope.autoReload = function autoReload() {
	        if ($scope.reloadBool) {
	            $scope.reloadBool = false;
	            $(document).ready(function () {
	                $('#messageBar').addClass('progress-bar-reload-disabled');
	            });
	        } else {
	            $scope.reloadBool = true;
	            $(document).ready(function () {
	                $('#messageBar').removeClass('progress-bar-reload-disabled');
	            });
	        }
	        console.log("autoReload: " + $scope.reloadBool);
	    }
	    $scope.$on("$destroy", function () {
	        // clean up autoReload interval
	        console.log("stopped newsLetterMessage autoReload: " + $interval.cancel(timer));
	    });
	});


app.controller('registerMessageController', function (notice, $scope, $http, $location, $route) {
    $scope.uploadResult = "";
    var stringMessage = "";
    
    $scope.myForm = {
        subject: "",
        message: "",
    }
    $scope.submitUserForm = function() {
    	
    	if ($scope.validateForm()) {
    	    var dataForm = new FormData();
      
    	    dataForm.append("subject", $scope.myForm.subject);
    	    dataForm.append("message", $scope.myForm.message);

//    	  if ($scope.validateForm()) {
//
//              var data = new FormData();
//              
//              data.append("title", $scope.myForm.title);
//              data.append("content", $scope.myForm.content);

			$http({
				method : 'POST',
				url : MessageResourceApi,
				//data : dataForm,
				data : $scope.myForm,
			}).then(function(response) {
				$location.path("/list-all-message");
				$route.reload();
			}, function(errResponse) {
				$scope.errorMessage = errResponse.data.errorMessage;
			});
    	} else {
    		console.log("notice.error: " + stringMessage);
          notice.error(stringMessage);
        }
    }
    $scope.resetForm = function () {
        $scope.myForm = null;
    };

    $scope.validateForm = function () {
        console.log("validateForm START");
        var booleanMsg = true;
        stringMessage='';
        var subjectTmp = $scope.myForm.subject;
        console.log("subjectTmp: " + subjectTmp);

        if (subjectTmp == undefined || subjectTmp == null || subjectTmp.length == 0) {
        	console.log("Errore");
            stringMessage = "inserisci un Oggetto valido";
            booleanMsg = false;
//            alert("inserisci un titolo valido");
//            return booleanMsg;
        }

        var messageTmp = $scope.myForm.message;
        console.log("messageTmp: " + messageTmp);

        if (messageTmp == undefined || messageTmp == null || messageTmp.length == 0) {
        	console.log("Errore");
            stringMessage += " inserisci un messaggio valido";
            booleanMsg = false;
//            alert("inserisci un contenuto valido");
//            return booleanMsg;
        }
        console.log("validateForm END --> booleanMsg: " + booleanMsg);
        return booleanMsg;
    };
});

app.controller('messageEditController',
		function($scope, $http, $location, $routeParams, $route) {
	    console.log("inizio message Edit controller");
//	    var data = new FormData();
	    $scope.messageCustomId = $routeParams.id;
	    console.log("$scope.messageCustomId: " + $scope.messageCustomId);
			$http({
				method : 'GET',
				url : MessageResourceApi + $scope.messageCustomId
			}).then(function(response) {
				console.log("partita la get");
				$scope.messageCustom = response.data;
			});
//			$scope.editNoteCustom = function (NoteCustomId) {
//		        $location.path("/update-noteTemplate/" + NoteCustomId);
//		    }	
			$scope.editMessageCustom = function() {
				console.log("Entro nella put");
				$http({
					method : 'PUT',
					url : MessageResourceApi + $scope.messageCustomId,
					data : $scope.messageCustom
				}).then(
						function(response) {
							$location.path("/list-all-message");
							console.log("effettuata con successo la put");
							$route.reload();
							
						},
								function(errResponse) {
//							        console.log(Response);
									console.log("sbombamento");
									$scope.errorMessage = "Error while updating Message - Error Message: '"
											+ errResponse.data.errorMessage;
								});
			}
		});

