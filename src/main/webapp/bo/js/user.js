function validateInsertForm() {

	if (validateForm()) {

		return true;
	} else {

		return false;
	}

}

function validateUpdateForm() {
	if (validateForm()) {

		return true;
	} else {

		return false;
	}
}

function check() {
	$('#message').show();
	if ($('#password').val() == $('#confirm_password').val()) {
		$(document).ready(function() {
			$('#message').html('Not Matching').removeClass('color');
		});
	} else
		$(document).ready(function() {
			$('#message').html('Not Matching').addClass('color');
		});
}

function validateForm() {

	console.log("validateUserForm invoked");

	resetValidationError();

	var firstname = $('#firstname').val();
	var lastname = $('#lastname').val();
	var email = $('#email').val();

	console.log(firstname);
	console.log(lastname);
	console.log(email);

	if (firstname.length < 2) {

		$('#firstnameError').show();
		$(document).ready(function() {
			$('#firstname').addClass('color');
		});

		return false;
	}

	if (lastname.length < 2) {

		$('#lastnameError').show();
		$(document).ready(function() {
			$('#lastname').addClass('color');
		});

		return false;
	}

	if (email.length < 2) {

		$('#emailError').show();
		$(document).ready(function() {
			$('#email').addClass('color');
		});
		return false;
	}

	return true;
}

function prepareDataToInsert() {

	var fullPath = $('#imgpath').val();
	var filename;
	if (fullPath) {
		var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath
				.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
		filename = fullPath.substring(startIndex);
		if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			filename = filename.substring(1);
		}

	}

	console.log(filename);

	var data = {
		"email" : $('#email').val(),
		"password" : $('#password').val(),
		"firstname" : $('#firstname').val(),
		"lastname" : $('#lastname').val(),
		"dateOfBirth" : $('#dateofbirth').val(),
		"regdate" : new Date("2015-3-25"),
		"role" : $('#role').val(),
		"imgpath" : "img/" + filename
	};
	return data;
}

function prepareDataForUpdate() {

	var fullPath = $('#imgpath').val();
	var filename = null;
	if (fullPath) {
		var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath
				.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
		filename = fullPath.substring(startIndex);
		if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			filename = filename.substring(1);
		}

	}

	console.log(filename);

	if (filename == null) {
		var data = {
			"id" : $('#idUser').val(),
			"email" : $('#email').val(),
			"password" : $('#password').val(),
			"firstname" : $('#firstname').val(),
			"lastname" : $('#lastname').val(),
			"dateOfBirth" : $('#dateofbirth').val(),
			"role" : $('#role').val(),
			"imgpath" : $('#imgpathImg').val()
		};
		return data;

	} else {

		var data = {
			"id" : $('#idUser').val(),
			"email" : $('#email').val(),
			"password" : $('#password').val(),
			"firstname" : $('#firstname').val(),
			"lastname" : $('#lastname').val(),
			"dateOfBirth" : $('#dateofbirth').val(),
			"role" : $('#role').val(),
			"imgpath" : "img/" + filename
		};
		return data;

	}

}

function initializeEntityForUpdateDialog(data) {

	$('#idUser').val(data.id);
	$('#email').val(data.email);
	$('#password').val(data.password);
	$('#firstname').val(data.firstname);
	$('#lastname').val(data.lastname);
	$('#dateofbirth').val(data.dateOfBirth);
	$('#role').val(data.role);
	//	$('#imgpath').val(data.imgpath); 
	$('#confirm_password').val("");
	$('#message').hide();
	$("#output").attr("src", data.imgpath);
	$('#imgpathImg').val(data.imgpath);

}

function createTable(currentList) {
	console.log("invocato metodo refreshTable()");

	var startable = "<table>" + "<tr>" + "<th>Firstname</th>"
			+ "<th>Lastname</th>" + "<th>Email Address</th>"
			+ "<th>Password</th>" + "<th>Date Of Birth</th>"
			+ "<th>Date Registration</th>" + "<th>Role</th>"
			+ "<th>Path Img</th>" + "<th></th>" + "<th></th>" + "</tr>";
	var bodyTable = " ";
	for (var i = 0; i < currentList.length; i++) {

		var tmp = "<tr>" + "<td>" + currentList[i].firstname + "</td>" + "<td>"
				+ currentList[i].lastname + "</td>" + "<td>"
				+ currentList[i].email + "</td>" + "<td>"
				+ currentList[i].password + "</td>" + "<td>"
				+ currentList[i].dateOfBirth + "</td> " + "<td>"
				+ currentList[i].regdate + "</td>" + "<td>"
				+ currentList[i].role + "</td>" + "<td>"
				+ currentList[i].imgpath + "</td>" + "<td>"
				+ "<input type='button' onclick='deleteById("
				+ currentList[i].id + ");'>" + "<td>"
				+ "<input type='button' id='myBtn'  onclick='loadForUpdate("
				+ currentList[i].id + ");'>" + "</td>" + "</tr>";

		bodyTable += tmp;
	}
	var endtable = "</table>";
	document.getElementById("tableList").innerHTML = startable + bodyTable
			+ endtable;
}

function retrieveRolesForRoleSelection() {
	console.log("retrieveRolesForRoleSelection: operation successfull");
	$
			.ajax({
				type : 'GET',
				url : '/api/v1/role/',
				dataType : 'json',
				statusCode : {
					// list all entity
					200 : function(data, textStatus, jQxhr) {
						console
								.log("retrieveRolesForRoleSelection: operation successfull");
						var roles;
						for (var i = 0; i < data.length; i++) {
							roles += "<option value='" + data[i].level + "' >"
									+ data[i].label + "</option>";
						}
						$("#role").html(roles);
						//				noticeSuccess();
					},
					// empty list
					204 : function(textStatus, jQxhr) {
						console
								.log("retrieveRolesForRoleSelection: entity not found");
						//				noticeWarn();
					},
					// database error
					500 : function(textStatus, jQxhr) {
						console
								.log("retrieveRolesForRoleSelections: error into database");
						noticeError();
					}
				}
			});
}

function resetFormFields() {

	$('#idUser').val("");
	$('#email').val("");
	$('#password').val("");
	$('#confirm_password').val("");
	$('#firstname').val("");
	$('#lastname').val("");
	$('#dateofbirth').val("");
	$('#role').val("");
	$('#imgpath').val("");
	$('#imgpathImg').val("");
	$('#message').hide();
	$("#output").attr("src", "#");

	resetValidationError();
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
