function validateInsertForm() {
	console.log("validateInsertForm invoked");
	return true ;
}
function prepareDataToInsert(){
	console.log("prepareDataToInsert() invoked");
	var data = {	
	        "userid": $('#userId').val(),
	        "surveyid": $('#surveyid').val(),
	        "generatedtoken": $('#generatedtoken').val(),
	        "expirationdate": $('#expirationdate').val() + "T00:00:00" //2018-12-05
	     
	   };
	console.log($( '#userId').val() );
	console.log( $('#surveyid').val() );
	console.log( $('#generatedtoken').val() );
	console.log( $('#expirationdate').val() );
	console.log("prepareDataToInsert() end");
	
	return data ;
}
function validateUpdateForm() {
	return true ;
}



function prepareDataForUpdate () {
	var data = {	
			"id":$('#idUserSurveyToken').val(),
	        "userid": $('#userId').val(),
	        "surveyid": $('#surveyid').val(),
	        "generatedtoken": $('#generatedtoken').val(),
	        "expirationdate": $('#expirationdate').val(),
	      
	   };
	return data ;
}

function initializeEntityForUpdateDialog (data) {	
	var userId=data.email;
	var surveyid=data.label;
	$("#userId").val(data.userid);
	$("#surveyid").val(data.surveyid);
	$("#generatedtoken").val(data.generatedtoken);
	$("#expirationdate").val(data.expirationdate);
	$("#idUserSurveyToken").val(data.id);
}

function createTable(currentList) {
	console.log("Invocato refreshTable()");
	retrieveUsersForUserSelection();
	retrieveLabelForSurveySelection();
	var startTable = "<table> " +
					"<tr> " +
						"<th>user email</th>"+
						"<th>survey label</th>"+
						"<th>generatedtoken</th>"+
						"<th>expirationdate</th>"+
						"<th></th>"+
						"<th></th>"+
					"</tr>" ;
	
	var bodyTable = "";
	
	for(var i=0 ;i<currentList.length ; i++) {
		
		var tmp ="<tr>" +
						"<td>"+currentList[i].userid+"</td>"+
						"<td>"+currentList[i].surveyid+"</td>"+
						"<td>"+currentList[i].generatedtoken+"</td>"+
						"<td>"+currentList[i].expirationdate+"</td>"+
						"<td>" +
				  			"<input type='button' onclick='deleteById("+currentList[i].id+");'>"+
				  	   "</td>"	+
				  		"<td>"+
				  			"<input type='button' id='myBtn' onclick='sendEmail("+currentList[i].id+");'>"+
				  		"</td>" +
				  "<tr>";
		
		bodyTable += tmp;
	}

	var endTable ="</table>";
	$('#tableList').html(startTable + bodyTable + endTable);
}
//function openDetailDialogInsert() {
//	console.log("openDetailDialogInsert() invoked");
//	$('#editButton').hide();	
//	$('#updateLabel').hide();
//	$('#insertButton').show();
//	$('#insertLabel').show();
//	$('#detailModal').show();
//	$("#userid").val("");
//	$("#surveyid").val("");
//	$("#generatedtoken").val("");
//	$("#expirationdate").val("");
//	$("#idUserSurveyToken").val("");
//	console.log("openDetailDialogInsert() end");
//}
function resetFormFields () {
	console.log("resetFormFields () invoked");
//	$("#userId").val("");
	retrieveUsersForUserSelection();
//	$("#surveyid").val("");
	retrieveLabelForSurveySelection();
	$("#generatedtoken").val("");
	$("#expirationdate").val("");
	$("#idUserSurveyToken").val("");
	console.log("resetFormFields () end");
}

//function validateForm(label, description, level) {
//	console.log("validateForm () invoked");
//	console.log("validateForm");
//	console.log(label);
//	console.log(description);
//	console.log(level);
//
//	if (level > 0) {
//		if (label.length < 2) {
//			document.getElementById("labelError").style.display = 'block';
//			document.getElementById("label").style.backgroundColor = 'red';
//			return false;
//		}
//	} else {
//		document.getElementById("levelError").style.display = 'block';
//		document.getElementById("level").style.backgroundColor = 'red';
//		return false;
//	}
//
//	return true;
//	console.log("validateForm () invoked");
//}

function sendEmail(id) {
	var data = {"id":$('#idUserSurveyToken').val()
	};
	console.log("sendemail invoked");
	$.ajax({
		type : 'GET',
		data : data,
		url : resourceApi+"/sendEmail/"+id,
		dataType : 'json',
		success: function(returnMsg) {
	        console.log("OK " + returnMsg);
		},
		failure : function(returnMsg) {
	        console.log("KO " + returnMsg);
		}
	});

}