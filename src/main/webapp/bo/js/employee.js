function validateInsertForm() {
	return validation() ;
}

function validateUpdateForm() {
	return validation() ;
}

function validation(){
	resetValidationError();
	if($('#userId').val()<0 || $('#userId').val() == null ){
		$('#userIdError').show();
		$(document).ready(function(){	
			$('#userId').addClass('color');
	});
		
		return false;
	}
	
	return true;
}

function prepareDataToInsert(){
	var data = {	
			"userId" : $('#userId').val(),
			"mobile" : $('#mobile').val(),
			"domicileCity" : $('#domicileCity').val(),
			"domicileStreetName" : $('#domicileStreetName').val(),
			"domicileHouseNumber" : $('#domicileHouseNumber').val(),
			"cvExternalPath" : $('#cvExternalPath').val()
	   };
	return data ;
}

function prepareDataForUpdate(){
	var data = {	
			"id":  $('#idEmployee').val(),
			"userId" : $('#userId').val(),
			"mobile" : $('#mobile').val(),
			"domicileCity" : $('#domicileCity').val(),
			"domicileStreetName" : $('#domicileStreetName').val(),
			"domicileHouseNumber" : $('#domicileHouseNumber').val(),
			"cvExternalPath" : $('#cvExternalPath').val(),
		};
	return data;
}

function initializeEntityForUpdateDialog(data){
	$('#idEmployee').val(data.id)
	$('#userId').val(data.userId);
	$('#mobile').val(data.mobile);
	$('#domicileCity').val(data.domicileCity);
	$('#domicileStreetName').val(data.domicileStreetName);
	$('#domicileHouseNumber').val(data.domicileHouseNumber);
	$('#cvExternalPath').val(data.cvExternalPath);	
	resetValidationError();
}

function createTable(currentList) {
	
	console.log("Invocato refreshTable()");
	retrieveUsersForUserSelection();
	var startTable = "<table> " +
					"<tr> " +
					"<th>USER ID</th>"+
					"<th>MOBILE</th>"+
					"<th>CITY</th>"+
					"<th>STREET NAME</th>"+
					"<th>STREET NUMBER</th>"+
					"<th>CV EXTERNAL PATH</th>"+
						"<th></th>"+
						"<th></th>"+
					"</tr>" ;
	
	var bodyTable = "";
	
	for(var i=0 ;i<currentList.length ; i++) {
		
		var tmp ="<tr>" +
						"<td>"+currentList[i].userId+"</td>"+
						"<td>"+currentList[i].mobile+"</td>"+
						"<td>"+currentList[i].domicileCity+"</td>"+
						"<td>"+currentList[i].domicileStreetName+"</td>"+
						"<td>"+currentList[i].domicileHouseNumber+"</td>"+
						"<td>"+currentList[i].cvExternalPath+"</td>"+
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
function resetFormFields(){
	$('#idEmployee').val("");
	$('#userId').val("");
	$('#mobile').val("");
	$('#domicileCity').val("");
	$('#domicileStreetName').val("");
	$('#domicileHouseNumber').val("");
	$('#cvExternalPath').val("");	
	resetValidationError();
}
function resetValidationError(){
	$('#userIdError').hide();
	$(document).ready(function(){	
		$('#userId').removeClass('color');
});
	
}