var localregister=MAIN_BACKEND_LOCATION+"/api/v1/user"

app.controller('registerAccountController', function($scope, $http, $location, $routeParams, $route) {

  $scope.pwdLength = false;

  $scope.submitUserForm = function() {
    $scope.user.regdate = new Date();
    $scope.user.role = 10;
    if (($scope.user.password == $scope.passwordcheck) && !$scope.pwdLength) {
      $http({
        method: 'POST',
        url: localregister+"/",
        data: $scope.user,
      }).then(function(response) {
        // console.log("$scope.user: " + $scope.user);
        $location.path("/welcome-page");
        $route.reload();
        }, function(errResponse) {
		$scope.errorMessage = "Error while registering the user: " + errResponse.data.errorMessage;
      });
    }
  }

  $scope.validatePwd = function() {
    if ($scope.user.password != null && ($scope.user.password.length < 8 || $scope.user.password.length > 50)) {console.log('ciao');
      $scope.pwdLength = true;
    } else {
      $scope.pwdLength = false;
    }
  }

  // console.log("$scope.user: " + $scope.user);
  $scope.resetForm = function() {
    $scope.user = null;
    $scope.passwordcheck= null;
    $('[class=btn-hide-validate]').hide();
    $('*').removeClass('alert-validate');
    $('*').removeClass('true-validate');
  }

  $scope.checkEmail = function(email) {
  if (email != "") {
    $http({
      method: 'GET',
      url: './api/user/email/' + email,
    }).then(function(response) {
      console.log("dada");
      $scope.users = response.data;
      if ($scope.users.id != null) {
        console.log("fqwfwqf");
        $scope.emailPresent = true;

      } else {
        $scope.emailPresent = false;
      }
    });
  }
}
});
