var resourceApi = '/centauri.be/api/v1/candidatecustom/quick/';
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function validateInsertForm() {
	console.log("invocato validateInsertform()");
	resetValidationError();

	var firstname = $('#firstname').val();
	var lastname = $('#lastname').val();
	var email = $('#email').val();

	console.log(firstname);
	console.log(lastname);
	console.log(email);

	var count = 0;
	
	if (firstname.length < 2 || firstname.length > 50) {

		$('#firstnameError').show();
		$(document).ready(function() {
			$('#firstname').addClass('color');
		});
		count++;
	}

	if (lastname.length < 2 || lastname.length > 50) {

		$('#lastnameError').show();
		$(document).ready(function() {
			$('#lastname').addClass('color');
		});
		count++;

	}

	if (email.length < 5) {

		$('#emailError').show();
		$(document).ready(function() {
			$('#email').addClass('color');
		});
		count++;
	}

	if(count==0)
		return true;
	else
		return false;
}

function insert() {
	console.log("insert invoked");

	if (validateInsertForm()) {

		var dataToInsert = prepareDataToInsert();
		// console.log("dataToInsert: " + dataToInsert);
		$.ajax({
			type : 'POST',
			url : resourceApi,
			data : JSON.stringify(dataToInsert),
			contentType : 'application/json',
			statusCode : {
				// entity inserted successfull
				201 : function(data, textStatus, jQxhr) {
					console.log("insert: operation successfull");
					console.log(data);
					noticeSuccess();
				},
				// cannot insert entity with response CONFLICT
				409 : function(data, textStatus, jQxhr) {
					console.log("insert: operation failed");
					console.log(data.responseJSON.errorMessage);
					noticeWarn();
				},
				// cannot insert entity with response BAD_REQUEST
				400 : function(data, textStatus, jQxhr) {
					console.log("insert: operation failed");
					console.log(data.responseJSON.errorMessage);
					noticeWarn();
				},
				// database error
				500 : function(textStatus, jQxhr) {
					console.log("insert: error into database");
					noticeErrorDB();
				}
			}
		});
	}

}

var timeNotice = 2000; // time in milliseconds (1000 = 1sec)

function noticeSuccess() {
	window.location.href = "success.html";
}

function noticeWarn() {
	window.location.href = "warn.html";
}

function noticeErrorDB() {
	window.location.href = "error.html";
}

function prepareDataToInsert() {
	console.log("invocato prepareDataToInsert()");

	var data = {
		"email" : $('#email').val(),
		"firstname" : $('#firstname').val(),
		"lastname" : $('#lastname').val()
	};
	return data;
}

function resetValidationError() {
	console.log("resetValidationError invoked");

	$('#firstnameError').hide();
	$('#lastnameError').hide();
	$('#emailError').hide();

	$(document).ready(function() {
		$('#firstname').removeClass('color');
		$('#lastname').removeClass('color');
		$('#email').removeClass('color');
	});
}