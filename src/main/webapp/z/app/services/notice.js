var timeNotice = 2000; // time in milliseconds (1000 = 1sec)

app.service('notice', function($rootScope) {

	this.success = function noticeSuccess() {
		console.log("noticeSuccess invoked");
		$rootScope.successMessageBool = true;
		setTimeout(function() {
			$('#noticeModalSuccess').fadeOut('fast');
			$rootScope.successMessageBool = false;
		}, timeNotice);
	}

	this.error = function noticeError(msg) {
		console.log("noticeError invoked");
		console.log("error message received: " + msg);
		$rootScope.errorMessage = msg;
		$rootScope.errorMessageBool = true;
		console.log("erorreorererr" + $rootScope.errorMessageBool)
		setTimeout(function() {
			$('#noticeModalError').fadeOut('fast');
			$rootScope.errorMessageBool = false;
			console.log("erorreorererr" + $rootScope.errorMessageBool)
			$rootScope.errorMessage = "";
		}, timeNotice);
	}

	this.warn = function noticeWarn(msg) {
		console.log("noticeWarn invoked");
		console.log("warn message received: " + msg);
		$rootScope.warnMessage = msg;
		$rootScope.warnMessageBool = true;
		setTimeout(function() {
			$('#noticeModalWarn').fadeOut('fast');
			$rootScope.warnMessageBool = false;
			$rootScope.warnMessage = "";
		}, timeNotice);
	}

	this.database = function noticeErrorDB() {
		console.log("noticeErrorDB invoked");
		$rootScope.errorDBMessageBool = true;
		setTimeout(function() {
			$('#noticeModalErrorDB').fadeOut('fast');
			$rootScope.errorDBMessageBool = false;
		}, timeNotice);
	}
});
