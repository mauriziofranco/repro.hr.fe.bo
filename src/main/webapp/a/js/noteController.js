var NoteTemplateResourceApi = MAIN_BACKEND_LOCATION+'/api/v1/note/';

app.controller('listNoteController', function (notice, $scope, $http, $location,
	    $route, $interval) {
//
	
	    function listAll() {
	        console.log("listAll invoked");
	        Pace.restart();
	        var currentPage = $scope.currentPage - 1;
	        var currentUrl = NoteTemplateResourceApi + "paginated/" + $scope.pageSize + "/" + currentPage + "/";
	        console.log("currentUrl: " + currentUrl);
	        $http({
	            method: 'GET',
	            url: NoteTemplateResourceApi
	        }).then(function (response) {
	        	console.log("1 - response.data: " + response.data);
	            $scope.list = response.data;
//	            if (response.data.totalPages != null)
//	                $scope.totalPages = response.data.totalPages;
//	            else
//	            	$scope.totalPages = 1;
	        });
	    }

	    $scope.editNoteCustom = function (NoteCustomId) {
	        $location.path("/update-noteTemplate/" + NoteCustomId);
	    }
	    $scope.deleteNoteTemplateCustom = function (NoteCustomId) {
	        $http({
	            method: 'DELETE',
	            url: NoteTemplateResourceApi + NoteCustomId
	        }).then(function (response) {
	                $location.path("/list-all-noteTemplate");
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

	    $scope.getNote = function () {
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
	    $scope.reloadNoteTemplate = 0;
	    

	    function incrSec() {
	        if ($scope.reloadBool) {
	            //			console.log("autoReload: " + $scope.reloadBool);
	            $scope.reloadNote += 10;
	            if ($scope.reloadNote > 100) {
	                $scope.reloadNote = 0;
	                reload();
	            }
	        }
	    }
	    timer = $interval(incrSec, 1000);

	    function reload() {
	        $scope.reloadNote = 0;
	        listAll();
	    }
	    $scope.listNote = function () {
	        reload();
	    }
	    reload();
	    $scope.autoReload = function autoReload() {
	        if ($scope.reloadBool) {
	            $scope.reloadBool = false;
	            $(document).ready(function () {
	                $('#noteTemplatebar').addClass('progress-bar-reload-disabled');
	            });
	        } else {
	            $scope.reloadBool = true;
	            $(document).ready(function () {
	                $('#noteTemplatebar').removeClass('progress-bar-reload-disabled');
	            });
	        }
	        console.log("autoReload: " + $scope.reloadBool);
	    }
	    $scope.$on("$destroy", function () {
	        // clean up autoReload interval
	        console.log("stopped noteTemplate autoReload: " + $interval.cancel(timer));
	    });
	});


app.controller('RegisterNoteController', function (notice, $scope, $http, $location, $route) {
    $scope.uploadResult = "";
    var stringMessage = "";
    
    $scope.myForm = {
        title: "",
        content: "",
    }
    $scope.submitUserForm = function() {
    	
    	if ($scope.validateForm()) {
    	    var dataForm = new FormData();
      
    	    dataForm.append("title", $scope.myForm.title);
    	    dataForm.append("content", $scope.myForm.content);

//    	  if ($scope.validateForm()) {
//
//              var data = new FormData();
//              
//              data.append("title", $scope.myForm.title);
//              data.append("content", $scope.myForm.content);

			$http({
				method : 'POST',
				url : NoteTemplateResourceApi,
				//data : dataForm,
				data : $scope.myForm,
			}).then(function(response) {
				$location.path("/list-all-noteTemplate");
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
        var titleTmp = $scope.myForm.title;
        console.log("titleTmp: " + titleTmp);

        if (titleTmp == undefined || titleTmp == null || titleTmp.length == 0) {
        	console.log("Errore");
            stringMessage = "inserisci un titolo valido";
            booleanMsg = false;
//            alert("inserisci un titolo valido");
//            return booleanMsg;
        }

        var contentTmp = $scope.myForm.content;
        console.log("contentTmp: " + contentTmp);

        if (contentTmp == undefined || contentTmp == null || contentTmp.length == 0) {
        	console.log("Errore");
            stringMessage += " inserisci un contenuto valido";
            booleanMsg = false;
//            alert("inserisci un contenuto valido");
//            return booleanMsg;
        }
        console.log("validateForm END --> booleanMsg: " + booleanMsg);
        return booleanMsg;
    };
});

app.controller('noteEditController',
		function($scope, $http, $location, $routeParams, $route) {
	    console.log("inizio note Edit controller");
//	    var data = new FormData();
	    $scope.noteCustomId = $routeParams.id;
	    console.log("$scope.noteCustomId: " + $scope.noteCustomId);
			$http({
				method : 'GET',
				url : NoteTemplateResourceApi + $scope.noteCustomId
			}).then(function(response) {
				console.log("partita la get");
				$scope.noteTemplateCustom = response.data;
			});
//			$scope.editNoteCustom = function (NoteCustomId) {
//		        $location.path("/update-noteTemplate/" + NoteCustomId);
//		    }	
			$scope.editNoteCustom = function() {
				console.log("Entro nella put");
				$http({
					method : 'PUT',
					url : NoteTemplateResourceApi + $scope.noteCustomId,
					data : $scope.noteTemplateCustom
				}).then(
						function(response) {
							$location.path("/list-all-noteTemplate");
							console.log("effettuata con successo la put");
							$route.reload();
							
						},
								function(errResponse) {
//							        console.log(Response);
									console.log("sbombamento");
									$scope.errorMessage = "Error while updating Note - Error Message: '"
											+ errResponse.data.errorMessage;
								});
			}
		});

//app.controller('noteEditController', function (notice, $scope, $http, $location, $routeParams, $route) {
//    $scope.NoteCustomId = $routeParams.id;
//    $http({
//        method: 'GET',
//        url: NoteTemplateResourceApi + $scope.NoteCustomId
//    }).then(function (response) {
//        $scope.NoteCustom = response.data;
//        console.log($scope.NoteCustom);
//    });
//
//    $scope.NoteCustom = {
//        title: "",
//        content: "",
//    }
//
//    $scope.submitUserForm = function () {
//
//        if ($scope.validateEditForm()) {
//            var data = new FormData();
//
//            $http.put(
//                NoteTemplateResourceApi +
//                $scope.NoteCustomId, data
//                 ).then(
//                // Success
//                function (response) {
//                    console.log(data);
//                    $location.path("/list-all-note");
//                    $route.reload();
//                    notice.success();
//                },
//                // Error
//                function (response) {
//                    $scope.uploadResult = response.data;
//                    console.log(response);
//                    if (response.status == 500)
//                        notice.database();
//                    else
//                        notice.error(response.data.errorMessage);
//
//                });
//        } else {
//            notice.error(stringMessage);
//        }
//
//    }
//
//    $scope.validateEditForm = function () {
//        console.log("validateForm START");
//
//        var titleTmp = $scope.NoteCustom.title;
//        console.log("titleTmp: " + titleTmp);
//
//        if (titleTmp == undefined || titleTmp == null ||
//            titleTmp == "") {
//            stringMessage = "titolo errato";
//            return false;
//        }
//
//        var contentTmp = $scope.NoteCustom.content;
//        console.log("contentTmp: " + contentTmp);
//
//        if (contentTmp == undefined || contentTmp == null ||
//            contentTmp == "") {
//            stringMessage = "contenuto errato";
//            return false;
//        }
//
//        console.log("validateForm END --> true");
//        return true;
//    };
//});


//app.controller('noteEditController',
//		function($scope, $http, $location, $routeParams, $route) {
//			$scope.noteId = $routeParams.id;
//			$http({
//				method : 'GET',
//				url : NoteTemplateResourceApi + $scope.NoteId
//			}).then(function(response) {
//				$scope.user = response.data;
//			});
//			$scope.editNoteForm = function() {
//				$http({
//					method : 'PUT',
//					url : NoteTemplateResourceApi + $scope.NoteId,
//					data : $scope.note,
//				})
//						.then(
//								function(response) {
//									$location.path("/list-all-note");
//									$route.reload();
//								},
//								function(errResponse) {
//									$scope.errorMessage = "Error while updating Note - Error Message: '"
//											+ errResponse.data.errorMessage;
//								});
//			}
//		});
