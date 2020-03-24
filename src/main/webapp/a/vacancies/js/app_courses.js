var app = angular.module('courseregistrationsystem', [ 'ngRoute', 'ngResource' ]);

//app.config(function($routeProvider) {
//	$routeProvider.when('/open-course/:code', {
//		templateUrl : './template/pubblication/index.html',
//		controller : 'listCoursePageController'
//	});
//});

app.config(function($routeProvider) {
	$routeProvider.when('/home', {
		//		candidates
		templateUrl : './template/home.html',
		controller : 'coursePageController'
	})
//	.when('/index/:code', {
//		//		candidates
//		templateUrl : './index.html',
//		controller : 'coursePageController'
//	})
	.otherwise({
		//		home
		redirectTo : '/home',
		templateUrl : './home.html',
		controller : 'coursePageController'
	});
});
