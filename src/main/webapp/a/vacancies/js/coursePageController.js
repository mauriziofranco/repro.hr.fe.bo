var courseResourceApi = MAIN_BACKEND_LOCATION+'/api/v1/coursepage/';

app.controller('coursePageController', function($scope, $http, $location,
		$route,$routeParams,$interval, $window) {

	$scope.current = "testo di default";
	
	var start=$location.$$absUrl.indexOf("=")+1;
	var end=$location.$$absUrl.indexOf("#");
	
	console.log(start);
	console.log(end);
	var result=$location.$$absUrl.substring(start,end);
	console.log(result);
	
	$http({
		method : 'GET',
		
		url : courseResourceApi + 'getBodyText/'+result
		
	}).then(function(response) {
		$scope.current= response.data;
		console.log("OK");
	});
	
});