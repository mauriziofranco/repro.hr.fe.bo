//var bookResourceApi2 = LIBRARY_BACKEND_LOCATION +'/centauri.be/api/v1/book/';

app.controller('registerBookController', function (notice, $scope, $http, $location, $route) {
    $scope.uploadResult = "";
    var stringMessage = "";
    $scope.myForm = {
        isbn: "",
        language: "",
        author: "",
        title: "",
        description: "",
        releaseDate: "",
        imgpath: "",

        files: []
    }

    $scope.submitBookForm = function () {

        // var url = "/rest/uploadMultiFiles";
    	console.log("submitBookForm START");
        if ($scope.validateForm()) {

            var data = new FormData();

            data.append("isbn", $scope.myForm.isbn);
            data.append("language", $scope.myForm.language);
            data.append("author", $scope.myForm.author);
            data.append("title", $scope.myForm.title);
            data.append("description", $scope.myForm.description);

            var releaseDate = $scope.myForm.releaseDate;
            console.log("releaseDate: " + releaseDate);
            if (releaseDate == undefined || releaseDate == null || releaseDate.length == 0) {
                releaseDate = new Date("11/11/1111");
            }
            
            data.append("releaseDate", releaseDate);


            

            if (typeof ($scope.myForm.files[0]) != "undefined") {
                console.log("bookPath " + $scope.myForm.files[0].name);
                data.append("files", $scope.myForm.files[0]);
                data.append("bookPath", $scope.myForm.files[0].name);
            }

            var config = {
                transformRequest: angular.identity,
                transformResponse: angular.identity,
                headers: {
                    'Content-Type': undefined 

                }
            }
            console.log("bookResourceApi: " + bookResourceApi);
            console.log("data.title: "+data.title)
//            var bookResourceApi3  = "http://localhost:8090/centauriLibraryBackend/api/v1/book/" + 'fullBook/' ;
            var bookResourceApi3  =bookResourceApi  + 'fullBook/' ;
            $http
                .post(bookResourceApi3, data, config)
                //.post("http://localhost:8090/centauriLibraryBackend/api/v1/book/fullBook/", data, config)
                .then(
                    // Success
                    function (response) {
                        $scope.uploadResult = response.data;
                        console.log(data);
                        $location
                            .path("/list-all-books");
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
    };

    $scope.resetForm = function () {
        $scope.myForm = null;
    };

    $scope.validateForm = function () {
        console.log("validateForm START");

        var titleTmp = $scope.myForm.title;
        console.log("titleTmp: " + titleTmp);

        if (titleTmp == undefined || titleTmp == null || titleTmp.length == 0) {
            stringMessage = "inserisci un titolo";
            return false;
        }
        
        var isbnTmp = $scope.myForm.isbn;
        console.log("isbnTmp: " + isbnTmp);
        console.log("isbnTmp.length: " + isbnTmp.length);
        console.log("isNaN(isbnTmp): " + isNaN(isbnTmp));
        if ( titleTmp != undefined && isbnTmp != null && isbnTmp.length != 0 ) {
        	if(isNaN(isbnTmp)){
        		console.log("qua ci entro");
        		stringMessage = "inserisci un isbn valido (13 cifre)";
        		return false;
        	}
        	if(isbnTmp.toString().length != 13){
        		console.log("qua ci entro2");
        		stringMessage = "inserisci un isbn valido (13 cifre)";
        		return false;
        	}
        }
        
        var fileTmp = $scope.myForm.files[0];
        if (fileTmp == undefined || fileTmp == null || fileTmp.length == 0) {
            stringMessage = "inserisci un file";
            return false;
        }
        
        
        console.log("validateForm END --> true");
        return true;
    };
});

app.controller('listBookController', function (notice, $scope, $http, $location, $route, $interval) {
    $scope.thumbImgFullPath = thumbImgFullPath ;
    function listItems() {
        console.log("list invoked");
        Pace.restart();
        $http({
            method: 'GET',
//            url: "http://localhost:8090/centauriLibraryBackend/api/v1/book/"
            url: bookResourceApi
           
        }).then(function (response) {
            $scope.list = response.data;
            console.log($scope.list); 
        });
    }
    $scope.updateBook = function (bookId) {
        $location.path("/update-book/" + bookId);
    }
    $scope.deleteBook = function (bookIsbn) {
        $http({
            method: 'DELETE',
            url: bookResourceApi + bookIsbn
        }).then(function (response) {
                $location.path("/list-all-books");
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
                else if (response.status == 409){
                	$location.path("/list-all-books");
                    console.log(response);
                    notice.warn(response.data.errorMessage);
                    reload();
                } else
                    notice.error(response.data.errorMessage);

            });
    }

    $scope.getCandidates = function () {
        listItems();
    }

    $scope.nextPage = function () {
        listItems();
    };

    $scope.prevPage = function () {
        listItems();
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
            id: '1',
            value: '5',
            size: 5
        } //This sets the default value of the select in the ui
    };

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
        listItems();
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

app.controller('bookDetailsController', function (notice, $scope, $http, $location, $routeParams, $route) {
//    var getImg = "";
//    var getCV = "";
    
    $scope.bookId = $routeParams.id;
    $scope.book = {
            isbn: "",
            title: "",
            description: "",
            author: "",
            thumbnailFileName:"",
            bookFileName:"",
            releaseDate: "",
            uploadDate:"",
            language: "",

    }
    $http({
        method: 'GET',
        url: bookResourceApi + $scope.bookId
    }).then(function (response) {
        $scope.book = response.data;
//        getImg = $scope.book.imgpath;
//        getCV = $scope.book.cvExternalPath;
        console.log($scope.book);
    });
    
    
    
    
    
  

    $scope.submitBookForm = function () {

//        console.log("getImg " + getImg);
//        console.log("getCV " + getCV);

        if ($scope.validateForm()) {
            var data = new FormData();
            data = $scope.book;
            console.log("$scope.book.title:    "+$scope.book.title + " - data.title: " + data.title);
            console.log(" --- DATA --- "+data);
            console.log(" --- DATA --- "+data.title);
            $http({
				method : 'PUT',
				url: bookResourceApi + $scope.bookId,
				data : $scope.book,
			}).then(
                // Success
                function (response) {
                    console.log(data);
                    $location.path("/list-all-books");
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
        }
        else {
            notice.error(stringMessage);
//        	console.log("errore");
        }

    }

    $scope.validateForm = function () {
    	 console.log("validateForm START");

         var titleTmp = $scope.book.title;
         console.log("titleTmp: " + titleTmp);

         if (titleTmp == undefined || titleTmp == null || titleTmp.length == 0) {
             stringMessage = "inserisci un titolo";
             return false;
         }
         
         var isbnTmp = $scope.book.isbn;
         console.log("isbnTmp: " + isbnTmp);
         console.log("isNaN(isbnTmp): " + isNaN(isbnTmp));
         console.log("isbnTmp.length: " + isbnTmp.length);
         if ( (isbnTmp != null || isbnTmp.length != 13) ) {
         	if(isNaN(isbnTmp)){
         		stringMessage = "inserisci un isbn valido (13 cifre)";
         		return false;
         	}
         	if(isbnTmp.toString().length != 13){
         		stringMessage = "inserisci un isbn valido (13 cifre)";
         		return false;
         	}
         }
         
         console.log("validateForm END --> true");
         return true;
    };
});