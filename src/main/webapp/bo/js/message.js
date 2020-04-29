//validano le form di insert e di update (dobbiamo farle)
function validateInsertForm() { 
	console.log("validateInsertForm invoked");
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

function prepareDataToInsert() {
	console.log("invocato prepareDataToInsert");
	var data = {
		"userId" : $('#userid').val(),
		"textMessage" : $("#textmessage").val(),
		"attachmentFileName" : $("#attachmentfilename").val()
	};
	console.log("userId: " + $('#userid').val());
	console.log("textMessage: " + $("#textmessage").val());
	console.log("attachmentFileName: " + $("#attachmentfilename").val());
	console.log(" prepareDataToInsert end");
	return data;
}

function prepareDataForUpdate(){ //prepara il payload da mandare indietro quando facciamo la request
	console.log("invocato prepareDataForUpdate");
	var data = {
			"id" : $('#idMessage').val(),
			"userId" : $('#userid').val(),
			"textMessage" : $("#textmessage").val(),
			"attachmentFileName" : $("#attachmentfilename").val()
		};
	console.log("userId: " + $('#userid').val());
	console.log("textMessage: " +$("#textmessage").val());
	console.log("attachmentFileName: " + $("#attachmentfilename").val());
	return data;	
	
}


function initializeEntityForUpdateDialog(data){
	$('#idMessage').val(data.id);
	$('#userid').val(data.userId);
	$("#textmessage").val(data.textMessage);
	$("#attachmentfilename").val(data.attachmentFileName);
	
}

function createTable(currentList) {
	console.log("invocato create Table");
	var startTable = "<table><th>message.table.userid</th><th>message.table.textmessage</th> <th>message.table.attachmentfilename</th><th></th><th></th></tr>";
	var bodyTable = "";
	for (var i = 0; i < currentList.length; i++) {
		var tmp = "<tr><td>"
				+ currentList[i].userId
				+ "</td>"
				+ "<td>"
				+ currentList[i].textMessage
				+ "</td>"
				+ "<td>"
				+ ((currentList[i].attachmentFileName!=null)?currentList[i].attachmentFileName:"")
			//	+ currentList[i].attachmentFileName
				+ "</td>"
				+ "<td>"
			//	+ "<td><form id='messageFormDelete"
			//	+ currentList[i].id
			//	+ "' method='POST'>"
			//	+ "<input type='hidden' name='id' id='idMessageDelete' value='"
			//	+ currentList[i].id
			//	+ "'>"
				+ "<input type='button' onclick='deleteById("
				+ currentList[i].id
				+ ");'>"
			//	+ "</form>"
				+ "</td><td><input type='button' id='myBtn' onclick='loadForUpdate("
				+ currentList[i].id + ");'/>" + "</td><tr>";
		bodyTable += tmp;
	}

	var endTable = "</table>";
	$('#tableList').html(startTable + bodyTable + endTable);

}



function resetFormFields() {
	$("#userid").val("");
	$("#textmessage").val("");
	$("#attachmentfilename").val("");
	$("#textMessageError").hide();
	$("#useridError").hide();
	$(document).ready(function(){
		$('#textmessage').removeClass('color');
		$('#userid').removeClass('color');
	});
}



function validateForm() {
	
	console.log("validateForm invoked");
	var b = true;
	if ($("#userid").val() > 0) {
		if ($("#textmessage").val().length < 1) {
			$("#textMessageError").show();
			$(document).ready(function(){
				$('#textmessage').addClass('color');
			});
			b=false;
		}
	} else {
		$("#useridError").show();
		$(document).ready(function(){
			$('#userid').addClass('color');
		});
		b=false;
	}

	return b;
}