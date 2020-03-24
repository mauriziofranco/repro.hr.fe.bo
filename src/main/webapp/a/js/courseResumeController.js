var courseResumeResourceApi = MAIN_BACKEND_LOCATION+'/api/v1/courseresume/';
var courseResourceApi2 = MAIN_BACKEND_LOCATION+'/api/v1/coursepage/codes';

app.controller('registerCourseResumeController', function (notice, $scope, $http, $location, $route) {
	console.log("registerCourseResumeController - START");

    $scope.uploadResult = "";
    var stringMessage = "";

    $http({
		method:'GET',
		url:courseResourceApi2
	}).then(function(response){	
		$scope.codeTemplate=(response.data);
	},function(errResponse) {
		console.log(errResponse.data);
		console.log("() end");
	});
    
    $scope.myForm = {
    		
    	code: "",
    	title: "",
        content: ""
        
    }
    
    var contentlengthmax = 2000;
    var myText = document.getElementById("myText");
    var wordCount = document.getElementById("wordCount");
    $scope.contentlengthmax = contentlengthmax; 
    
    $scope.myForm.content = myText.addEventListener("keyup",function(){
    	var characters = myText.value.split('');
      wordCount.innerText = "Caratteri rimanenti: " + (contentlengthmax - characters.length); 
    });   
    
    $scope.insertTitleForm = function () {
    	if (confirm("Vuoi inserire il titolo del corso?")){
    		console.log("scelta: " + $scope.myForm.code);
    		$scope.myForm.title = $scope.myForm.code;
    	}
  };
    
    $scope.submitUserForm = function () {

    	if ($scope.validateForm()) {
            var data = new FormData();
            
            data.append("code",
                    $scope.myForm.code);
            console.log("$scope.myForm.code " +
                $scope.myForm.code);
            data.append("title",
                    $scope.myForm.title);
            console.log("$scope.myForm.title " +
                $scope.myForm.title);
            data.append("content",
                $scope.myForm.content);
            console.log("$scope.myForm.content " +
                    $scope.myForm.content);
            
            $http({
    			method : 'POST',
    			url : courseResumeResourceApi,
    			data : JSON.stringify($scope.myForm)
    		})
//            $http
//                .post(courseResumeResourceApi, data)
                .then(
                    // Success
                    function (response) {
                        $scope.uploadResult = response.data;
                        console.log(data);
                        $location
                            .path("/list-all-courseresumes");
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
    }
    
    $scope.validateForm = function () {
        console.log("validateForm START");

        var titleTmp = $scope.myForm.title;
        console.log("titleTmp: " + titleTmp);

        if (titleTmp == undefined || titleTmp == null || titleTmp.length == 0) {
            stringMessage = "inserisci un titolo valido";
            return false;
        }

        console.log("validateForm END --> true");
        return true;
    };
});

app.controller('listCourseResumeController', function(notice, $scope, $http, $location,
		$route, $interval) {
	
	console.log("listCourseResumeController - START");
	
	function listCourseResume() {
        console.log("list CourseResume invoked");
        Pace.restart();
        var currentPage = $scope.currentPage - 1;
        $http({
            method: 'GET',
            url: courseResumeResourceApi + "paginated/" + $scope.pageSize + "/" + currentPage + "/"
        }).then(function (response) {
            $scope.list = response.data.content;
            if (response.data.totalPages != null)
                $scope.totalPages = response.data.totalPages;
            else
            	$scope.totalPages = 1;
        });
    }
	
    $scope.editCourseResume = function (courseResumeId) {
        $location.path("/update-courseresume/" + courseResumeId);
    }
    
    $scope.deleteCourseResume = function (courseResumeId) {
        $http({
            method: 'DELETE',
            url: courseResumeResourceApi + courseResumeId
        }).then(function (response) {
                $location.path("/list-all-courseresumes");
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

    $scope.getCourseResumes = function () {
    	console.log("getCourseResumes - START");
        $scope.currentPage = 1;
        $scope.pageSize = $scope.data.selectedOption.size;
        listCourseResume();
    }

    $scope.nextPage = function () {
        $scope.currentPage += 1;
        listCourseResume();
    };

    $scope.prevPage = function () {
        $scope.currentPage -= 1;
        listCourseResume();
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
    $scope.reloadCourseResume = 0;
    

    function incrSec() {
        if ($scope.reloadBool) {
            //			console.log("autoReload: " + $scope.reloadBool);
            $scope.reloadCourseResume += 10;
            if ($scope.reloadCourseResume > 100) {
                $scope.reloadCourseResume = 0;
                reload();
            }
        }
    }
    timer = $interval(incrSec, 1000);

    function reload() {
        $scope.reloadCourseResume = 0;
        listCourseResume($scope.courseCode);
    }
    $scope.listCourseRes = function () {
        reload();
    }
    reload();
    $scope.autoReload = function autoReload() {
        if ($scope.reloadBool) {
            $scope.reloadBool = false;
            $(document).ready(function () {
                $('#courseresumebar').addClass('progress-bar-reload-disabled');
            });
        } else {
            $scope.reloadBool = true;
            $(document).ready(function () {
                $('#courseresumebar').removeClass('progress-bar-reload-disabled');
            });
        }
        console.log("autoReload: " + $scope.reloadBool);
    }
    $scope.$on("$destroy", function () {
        // clean up autoReload interval
        console.log("stopped CourseResume autoReload: " + $interval.cancel(timer));
      
    });
});

app.controller('courseResumeDetailsController', function (notice, $scope, $http, $location, $routeParams, $route) {

	console.log("courseResumeDetailsController -- START");
	
    $scope.courseResumeId = $routeParams.id;
    
    $http({
        method: 'GET',
        url: courseResumeResourceApi + $scope.courseResumeId
    }).then(function (response) {
        $scope.courseResume = response.data;
        console.log($scope.courseResume);
    });

    $scope.courseResume = {
    		title: "",
            content: "",
            	
    }

    $scope.submitUserForm = function () {

        if ($scope.validateForm()) {
            var data = new FormData();

            data.append("title",
                    $scope.courseResume.title);
            console.log("$scope.courseResume.title " +
                $scope.courseResume.title);
            data.append("content",
                $scope.courseResume.content);
            console.log("$scope.courseresume.content " +
                    $scope.courseResume.content);

//            if ($scope.courseResume.code == null) {
//                data.append("code", false);
//            } else {
//                data.append("code",
//                    $scope.courseResume.code);
//                console.log("code" +
//                    $scope.courseResume.code);
//            }

            $http({
				method : 'PUT',
				url : courseResumeResourceApi + $scope.courseResumeId,
				data : $scope.courseResume
			}).then(
                // Success
                function (response) {
                    console.log(data);
                    $location.path("/list-all-courseresumes");
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

        var titleTmp = $scope.courseResume.title;
        console.log("titleTmp: " + titleTmp);

        if (titleTmp == undefined || titleTmp == null || titleTmp.length == 0) {
            stringMessage = "inserisci un titolo valido";
            return false;
        }

        console.log("validateForm END --> true");
        return true;
    };
    
    var contentlengthmax = 2000;
    var myText = document.getElementById("myText");
    var wordCount = document.getElementById("wordCount");
    $scope.contentlengthmax = contentlengthmax; 
    
    $scope.courseResume.content = myText.addEventListener("keyup",function(){
    	var characters = myText.value.split('');
      wordCount.innerText = "Caratteri rimanenti: " + (contentlengthmax - characters.length); 
    });
});