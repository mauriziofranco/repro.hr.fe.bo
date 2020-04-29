var local=MAIN_BACKEND_LOCATION+"/user"

app.controller('loginController', function($rootScope, $scope,
                $http, $location, $route){
//	$rootScope.authenticated = false ;
//	    console.log("LOGIN CONTROLLER $rootScope.authenticated: " + $rootScope.authenticated);
//        $scope.credentials = {username:"a@a.com", password:"test"};
        $rootScope.adminUser=false;
		$rootScope.is_visible = false;

        $scope.resetForm = function() {
                $scope.credentials.username = null;
                $scope.credentials.password = null;
//                $('#noticeModalError').fadeOut(1500);
        }
        var authenticate = function(credentials, callback) {
        	console.log("$scope.credentials:  "+$scope.credentials + "$scope.credentials.username   "+$scope.credentials.username);
        	$rootScope.username=$scope.credentials.username;
        	$rootScope.password=$scope.credentials.password;
//                var headers = $scope.credentials ? {
//                        authorization : "Basic "
//                                        + btoa($scope.credentials.username + ":"
//                                                        + $scope.credentials.password)
//                        } : {};
        	var headers =  {};
                $http.get(local, {
                        headers : headers
//                        ,
//                        function(res){
//                        	res.header("Access-Control-Allow-Origin","*");
//                        	res.header("Access-Control-Allow-Headers","X-Requested-With");
//                        }
                }).then(function(response) {
                	console.log("response.data.name: " + response.data);
                        if (response.data.name) {
                                $rootScope.authenticated = true;
                                $('#sidebar').css({"display": "block"});
                                $('.nav-authenticated').css({"display": "block"});
                                     console.log("$rootScope.authenticated 1"+ $rootScope.authenticated)
                                $http({
                            		method : 'GET',
                            		url : MAIN_BACKEND_LOCATION+'/api/v1/user/email/'+$scope.credentials.username
                            	}).then(function(response) {
                            		console.log(response.data);
                            		$rootScope.userLogged = response.data;
                            		$rootScope.is_visible = true;
                            		console.log("Utente "+$rootScope.userLogged.id+" loggato!");
                            		console.log("L'utente ha ruolo: "+$rootScope.userLogged.role);
                            		if ($rootScope.userLogged.role == 0){
                            			$rootScope.adminUser=true;
                            		}
                            	});

                        } else {
                                $rootScope.authenticated = false;
                                $('.notice').css({"display": "none"});
                                console.log("$rootScope.authenticated 2"+ $rootScope.authenticated)
                        }
                        callback && callback();
                }, function() {
                	$('.notice').css({"display": "block"});
                        $rootScope.authenticated = false;
                        console.log("$rootScope.authenticated 1"+ $rootScope.authenticated)
                        callback && callback();
                });
        }
        $scope.loginUser = function() {
              authenticate($scope.credentials, function() {
                  if ($rootScope.authenticated) {
                    $location.path("/");
                    $scope.loginerror = false;
                  } else {
                    $location.path("/login");
                    $scope.loginerror = true;
                  }
             });
        };
});
