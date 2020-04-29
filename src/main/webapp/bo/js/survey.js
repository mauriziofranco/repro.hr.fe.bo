
function validateInsertForm() {
	console.log("validateInsertForm invoked");
	if (validateForm()) {
		return true;
	} else {
		return false;
	}
}

function validateUpdateForm() {
	console.log("validateUpdateForm invoked");
	if (validateForm()) {
		return true;
	} else {
		return false;
	}
}


function validateForm(label,description) {
	resetValidationError();
	console.log("validateForm");
	console.log(label);
	console.log(description);
	
	if (($('#label').val().length < 3) || ($('#label').val().length > 50)){
		console.log("errore");
		$('#labelError').show();
		$(document).ready(function(){	
			$('#label').addClass('color');
	});
		
		return false;
	} 
	
	
	else if (($('#description').val().length < 3)||($('#description').val().length > 100)){
		console.log("errore");
		$('#descError').show();
		$(document).ready(function(){	
			$('#description').addClass('color');
	});
	
		return false;
	} 
	
	return true;
}

function resetValidationError() {
	console.log("resetValidationError invoked");

	// Label
	$('#labelError').hide();
	$('#descError').hide();
	$(document).ready(function(){	
		$('#description').removeClass('color');
		$('#label').removeClass('color');
});
	
}

function prepareDataToInsert(){
	var data = {	"label": $('#label').val(),
					"description": $('#description').val(),
					"time": $('#time').val()
				};
	return data ;
}

function prepareDataForUpdate () {
	var data = {	
			"id": $('#idSurvey').val(),
			"label": $('#label').val(), 
			"description": $('#description').val(),
			"time": $('#time').val()
	   };
	return data ;
}

function initializeEntityForUpdateDialog (data){
	
	$('#idSurvey').val(data.id);
	$('#label').val(data.label);
	$('#description').val(data.description);
	$('#time').val(data.time);
	
}

function createTable(currentList) {
	
	console.log("Invocato createTable()");
	var startTable = "<table> " +
					"<tr> " +
						"<th>"+label+"</th>"+
						"<th>"+description+"</th>"+
						"<th></th>"+
						"<th></th>"+
					"</tr>" ;
	
	var bodyTable = "";
	
	for(var i=0 ;i<currentList.length ; i++) {
		
		var tmp ="<tr>" +
						"<td>"+currentList[i].label+"</td>"+
						"<td>"+currentList[i].description+"</td>"+
						"<td>" +
				  			"<input type='button' onclick='deleteById("+currentList[i].id+");'>"+
				  	   "</td>"	+
				  		"<td>"+
				  			"<input type='button' id='myBtn'  onclick='loadForUpdate("+currentList[i].id+");'>"+
				  		"</td>" +
				  "<tr>";
		
		bodyTable += tmp;
	}

	var endTable ="</table>";
	$('#tableList').html(startTable + bodyTable + endTable);
}

function resetFormFields () {
	$('#idSurvey').val("");
	$('#label').val("");
	$('#description').val("");
	$('#time').val("");
	resetValidationError();
}












