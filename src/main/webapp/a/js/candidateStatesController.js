var candidateStatesResourceApi = MAIN_BACKEND_LOCATION+'/api/v1/candidateStates/';

app.controller('registerCandidateStatesController', function (notice, $scope, $http, $location, $route) {
	$scope.submitUserForm = function() {
		$http({
			method : 'POST',
			url : candidateStatesResourceApi,
			data : $scope.user,
		}).then(function(response) {
			$location.path("/list-all-candidateStates");
			$route.reload();
		}, function(errResponse) {
			$scope.errorMessage = errResponse.data.errorMessage;
		});
	}
	$scope.resetForm = function() {
		$scope.user = null;
	};
});

app.controller('listCandidateStatesController',
		function($scope, $http, $location, $route) {
			$http({
				method : 'GET',
				url : candidateStatesResourceApi
			}).then(function(response) {
				console.log(response);
				$scope.list = response.data;
			});
			$scope.editUser = function(userId) {
				$location.path("/update-candidateStates/" + userId);
			}
			$scope.deleteUser = function(userId) {
				$http({
					method : 'DELETE',
					url : candidateStatesResourceApi + userId
				}).then(function(response) {
					console.log(response);
					$location.path("/list-all-candidateStates");
					$route.reload();
				});
			}
		});

app
.controller(
		'candidateStatesDetailsController',
		function($scope, $http, $location, $routeParams, $route) {
			$scope.userId = $routeParams.id;
			$http({
				method : 'GET',
				url : candidateStatesResourceApi + $scope.userId
			}).then(function(response) {
				$scope.user = response.data;
			});
			$scope.submitUserForm = function() {
				$http({
					method : 'PUT',
					url : candidateStatesResourceApi +$scope.userId,
					data : $scope.user,
				})
						.then(
								function(response) {
									$location.path("/list-all-candidateStates");
									$route.reload();
								},
								function(errResponse) {
									$scope.errorMessage = "Error while updating User - Error Message: '"
											+ errResponse.data.errorMessage;
								});
			}
		});