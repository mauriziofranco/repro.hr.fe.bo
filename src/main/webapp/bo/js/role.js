function validateInsertForm() {
	return true ;
}

function validateUpdateForm() {
	return true ;
}

function prepareDataToInsert(){
	var data = {	"label": $('#label').val(), 
			"description": $('#description').val(),
			"level": $('#level').val()
	   };
	return data ;
}

function prepareDataForUpdate () {
	var data = {	
			"id":  $('#idRole').val(),
			"label": $('#label').val(), 
			"description": $('#description').val(),
			"level": $('#level').val()
		};
	return data ;
}

function initializeEntityForUpdateDialog (data) {
	$("#label").val(data.label);
	$("#description").val(data.description);
	$("#level").val(data.level);
	$("#idRole").val(data.id);
}

function createTable(currentList) {
	
	console.log("Invocato refreshTable()");
	var startTable = "<table> " +
					"<tr> " +
						"<th>"+label+"</th>"+
						"<th>"+description+"</th>"+
						"<th>"+level+"</th>"+
						"<th></th>"+
						"<th></th>"+
					"</tr>" ;
	
	var bodyTable = "";
	
	for(var i=0 ;i<currentList.length ; i++) {
		
		var tmp ="<tr>" +
						"<td>"+currentList[i].label+"</td>"+
						"<td>"+currentList[i].description+"</td>"+
						"<td>"+currentList[i].level+"</td>"+
						"<td>" +
				  			"<input type='button' onclick='deleteById("+currentList[i].id+");'/>"+
				  	   "</td>"	+
				  		"<td>"+
				  			"<input type='button' id='myBtn'  onclick='loadForUpdate("+currentList[i].id+");'/>"+
				  		"</td>" +
				  "<tr>";
		
		bodyTable += tmp;
	}

	var endTable ="</table>";
	$('#tableList').html(startTable + bodyTable + endTable);
}

function resetFormFields () {
	$("#label").val("");
	$("#description").val("");
	$("#level").val("");
	$("#idRole").val("");
	$(document).ready(function(){	
		$('#label').removeClass('color');
		$('#level').removeClass('color');
});
	
}

function validateForm(label,description,level) {
	
	console.log("validateForm");
	console.log(label);
	console.log(description);
	console.log(level);

	if (level > 0) {
		if (label.length < 2) {
			$('#labelError').show();
			$(document).ready(function(){	
				$('#label').addClass('color');
		});
			
			return false;
		} 
	} else {
		$('#levelError').show();
		$(document).ready(function(){	
			$('#level').addClass('color');
	});
		
		return false;
	}

	return true;
}