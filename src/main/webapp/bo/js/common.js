function includeHTML() {
	var z, i, elmnt, file, xhttp;
	/* loop through a collection of all HTML elements: */
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/* search for elements with a certain atrribute: */
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
			/* make an HTTP request using the attribute value as the file name: */
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						elmnt.innerHTML = this.responseText;
					}
					if (this.status == 404) {
						elmnt.innerHTML = "Page not found.";
					}
					/* remove the attribute, and call this function once more: */
					elmnt.removeAttribute("w3-include-html");
					includeHTML();
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			/* exit the function: */
			return;
		}
	}
};

function closeDetailDialog() {

	$('#detailModal').hide();

}

function insert() {
	console.log("insert invoked");
	
	if (validateInsertForm()) {

		var dataToInsert = prepareDataToInsert();
		
		$.ajax({
			type : 'POST',
			url : resourceApi,
			data : JSON.stringify(dataToInsert),
			contentType : 'application/json',
			statusCode: {
				// entity inserted successfull
				201: function(data, textStatus, jQxhr){
					console.log("insert: operation successfull");
					console.log(data);
					refreshTable();
					$('#detailModal').hide();
					noticeSuccess();
				},
				// cannot insert entity with response CONFLICT
				409: function(data, textStatus, jQxhr){
					console.log("insert: operation failed");
					console.log(data);
					noticeWarn(data.responseJSON.errorMessage);
				},
				// cannot insert entity with response BAD_REQUEST
				400: function(data, textStatus, jQxhr){
					console.log("insert: operation failed");
					console.log(data);
					noticeWarn(data.responseJSON.errorMessage);
				},
				// database error
				500: function(textStatus, jQxhr){
					console.log("insert: error into database");
					noticeErrorDB();
				}
			}
		});
	}

}

function refreshTable() {
	console.log("refreshTable invoked");
	
	loading();
	$.ajax({
		type : 'GET',
		url : resourceApi,
		dataType : 'json',
		statusCode: {
			// list all entity
			200: function(data, textStatus, jQxhr){
				console.log("refreshTable: operation successfull");
				createTable(data);
				closeLoading();
			},
			// empty list
			204: function(textStatus, jQxhr){
				console.log("refreshTable: entity not found");
				createTable([]);
				closeLoading();
//				noticeWarn();
			},
			// database error
			500: function(textStatus, jQxhr){
				console.log("refreshTable: error into database");
				noticeErrorDB();
			}
		}
	});
}

function deleteById(id) {
	console.log("deleteById invoked");

	$.ajax({
		type : 'DELETE',
		url : resourceApi + id,
		contentType : 'application/json',
		statusCode: {
			// entity delete successfull
			204: function(textStatus, jQxhr){
				console.log("deleteById: operation successfull");
				refreshTable();
				noticeSuccess();
			},
			// entity not found
			404: function(data, textStatus, jQxhr){
				console.log("deleteById: entity not found");
				console.log(data);
				noticeError(data.responseJSON.errorMessage);
			},
			// entity referenced by another entity
			409: function(data, textStatus, jQxhr){
				console.log("deleteById: entity referenced by another entity");
				console.log(data);
				noticeWarn(data.responseJSON.errorMessage);
			},
			// database error
			500: function(textStatus, jQxhr){
				console.log("deleteById: error into database");
				noticeErrorDB();
			}
		}
	});
}

function loadForUpdate(id) {
	console.log("loadForUpdate invoked");
	
	$.ajax({
		type : 'GET',
		url : resourceApi + id,
		dataType : 'json',
		statusCode: {
			// entity get successfull
			200: function(data, textStatus, jQxhr){
				console.log("loadForUpdate: operation successfull");
				console.log(data);
				initializeEntityForUpdateDialog(data);
				$('#editButton').show();
				$('#editLabel').show();
				$('#insertButton').hide();
				$('#insertLabel').hide();
				$('#detailModal').show();
			},
			// entity not found
			404: function(data, textStatus, jQxhr){
				console.log("loadForUpdate: entity not found");
				console.log(data);
				noticeError(data.responseJSON.errorMessage);
			},
			// database error
			500: function(textStatus, jQxhr){
				console.log("loadForUpdate: error into database");
				noticeErrorDB();
			}
		}
	});
}

function update() {
	console.log("update invoked");
	 
	if (validateUpdateForm()) {

		var dataToUpdate = prepareDataForUpdate();

		$.ajax({
			type : 'PUT',
			url : resourceApi + dataToUpdate.id,
			data : JSON.stringify(dataToUpdate),
			contentType : 'application/json',
			statusCode: {
				// entity updated successfull
				200: function(data, textStatus, jQxhr){
					console.log("update: operation successfull");
					console.log(data);
					refreshTable();
					$('#detailModal').hide();
					noticeSuccess();
				},
				// entity not found
				404: function(data, textStatus, jQxhr){
					console.log("update: entity not found");
					console.log(data);
					noticeError(data.responseJSON.errorMessage);
				},
				// entity referenced by another entity
				409: function(data, textStatus, jQxhr){
					console.log("update: entity referenced by another entity");
					console.log(data);
					noticeWarn(data.responseJSON.errorMessage);
				},
				// database error
				500: function(textStatus, jQxhr){
					console.log("update: error into database");
					noticeErrorDB();
				}
			}
		});
	}
}

function openDetailDialogInsert() {
	console.log("openDetailDialogInsert invoked");
	
	$('#editButton').hide();
	$('#editLabel').hide();
	$('#insertButton').show();
	$('#insertLabel').show();

	resetFormFields();

	$('#detailModal').show();
//	console.log("openDetailDialogInsert() end");
}

function loading() {
	console.log("loading invoked");
	$('#loadingModal').show();
}

function closeLoading() {
	console.log("closeLoading invoked");
	$('#loadingModal').hide();
}

var timeNotice=2000; //time in milliseconds (1000 = 1sec)

function noticeSuccess(){
	console.log("noticeSuccess invoked");
	$('#noticeModalSuccess').fadeIn('fast'); 
	setTimeout(function() {
	    $('#noticeModalSuccess').fadeOut('fast');
	}, timeNotice); 
}

function noticeError(msg){
	console.log("noticeError invoked");
	var warn = "<b>Error! </b>";
	$('#errorLabel').html(warn + msg);
	$('#noticeModalError').fadeIn('fast');
	setTimeout(function() {
	    $('#noticeModalError').fadeOut('fast');
	}, timeNotice); 
}

function noticeWarn(msg){
	console.log("noticeWarn invoked");
	var warn = "<b>Warn! </b>";
	$('#warnLabel').html(warn + msg);
	$('#noticeModalWarn').fadeIn('fast');
	setTimeout(function() {
	    $('#noticeModalWarn').fadeOut('fast');
	}, timeNotice); 
}

function noticeErrorDB(){
	console.log("noticeErrorDB invoked");
	$('#noticeModalErrorDB').fadeIn('fast');
	setTimeout(function() {
	    $('#noticeModalErrorDB').fadeOut('fast');
	}, timeNotice); 
}

function retrieveUsersForUserSelection() {
	console.log("retrieveUsersForUserSelection: operation successfull");
	$.ajax({
		type : 'GET',
		url : '/api/v1/user/',
		dataType : 'json',
		statusCode: {
			// list all entity
			200: function(data, textStatus, jQxhr){
				console.log("retrieveUsersForUserSelection: operation successfull");
				var users;
				for(var i=0; i<data.length; i++){
					users+= "<option value='"+data[i].id+"' >"+data[i].email+"</option>";
				}
				$("#userId").html(users);
//				noticeSuccess();
			},
			// empty list
			204: function(textStatus, jQxhr){
				console.log("retrieveUsersForUserSelection: entity not found");
//				noticeWarn();
			},
			// database error
			500: function(textStatus, jQxhr){
				console.log("retrieveUsersForUserSelection: error into database");
				noticeErrorDB();
			}
		}
	});
}
function retrieveLabelForSurveySelection() {
	console.log("retrieveLabelForSurveySelection: operation successfull");
	$.ajax({
		type : 'GET',
		url : '/api/v1/survey/',
		dataType : 'json',
		statusCode: {
			// list all entity
			200: function(data, textStatus, jQxhr){
				console.log("retrieveLabelForSurveySelection: operation successfull");
				var survey;
				for(var i=0; i<data.length; i++){
					survey+= "<option value='"+data[i].id+"' >"+data[i].label+"</option>";
				}
				$("#surveyid").html(survey);
			},
			// empty list
			204: function(textStatus, jQxhr){
				console.log("retrieveLabelForSurveySelection: entity not found");
			}
		}
	});
}

document.title=tabTitle;
includeHTML();
