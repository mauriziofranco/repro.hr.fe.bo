var prova = true;

function validateInsertForm() {
	console.log("validateInsertForm invoked");
	if (validateForm()) {
		return true;
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

function validateForm(title, body_text) {
	resetValidationError();
	console.log("validateForm");
	console.log(title);
	console.log(body_text);

	if (($('#title').val().length < 3) || ($('#title').val().length) > 300) {
		console.log("errore");
		$('#titleError').show();
		$('#title').css("background-color", "red");
		return false;
	}

	else if (($('#body_text').val().length < 3)
			|| ($('#body_text').val().length) > 50000) {
		console.log("errore");
		$('#body_textError').show();
		$('#body_text').css("background-color", "red");
		return false;
	}

	return true;
}

function resetValidationError() {
	console.log("resetValidationError invoked");

	$('#titleError').hide();
	$('#body_textError').hide();
	$('#body_text').css('background-color', '');
	$('#title').css('background-color', '');
}

function prepareDataToInsert() {
	console.log("Invocato prepareDataToInsert()");

	var data = {
		"title" : $('#title').val(),
		"bodyText" : $('#body_text').val(),
		"code": $('#code').val()
	};
	return data;
}

function prepareDataForUpdate() {
	console.log("Invocato prepareDataForUpdate()");

	var data = {
		"id" : $('#idCoursePage').val(),
		"title" : $('#title').val(),
		"bodyText" : $('#body_text').val(),
		"code": $('#code').val()
	}
	console.log("data" + data.id + data.title + data.body_text);
	return data;
}

function initializeEntityForUpdateDialog(data) {
	console.log("Invocato initializeEntityForUpdateDialog()");

	$('#title').val(data.title);
	$('#body_text').val(data.bodyText);
	$('#idCoursePage').val(data.id);
	$('#code').val(data.code);
}

function resetFormFields() {
	console.log("Invocato resetFormFields()");

	$('#idCoursePage').val("");
	$('#title').val("");
	$('#body_text').val("");
	$('#code').val("");

	resetValidationError();
}

function initializeCode(code) { //#############################################
	$("#code").val(code);
}


function createTable(currentList) {

	console.log("Invocato createTable()");
	var startTable = "<table> " + "<tr> " + "<th>Title</th>" + "<th>Code</th>"
			+ "<th>Modifica</th>" + "<th>Cancella </th>" + "<th>On/Off</th>"
			+ "</tr>";

	var bodyTable = "";

	for (var i = 0; i < currentList.length; i++) {

		var onlineButtonStyle = (currentList[i].fileName!=null)?"background-color:green;":"background-color:gray;";
		var offlineButtonStyle = (currentList[i].fileName==null)?"background-color:red;":"background-color:gray;";
		var onlineEvent = (currentList[i].fileName==null)?"onclick='setOnline("+ currentList[i].id +")'":"";
		var offlineEvent = (currentList[i].fileName!=null)?"onclick='setOffline("+ currentList[i].id +")'":"";
//		var openEvent = (currentList[i].fileName!=null)?"onclick='openFile("+ currentList[i].id +")'":"";
//		var openEventButtonStyle = (currentList[i].fileName!=null)?"background-color:yellow;":"background-color:grey;";
		
		var tmp = "<tr>" + "<td>" + currentList[i].title + "</td>" +
		"<td>" + currentList[i].code + "</td>" +

		"<td>" + "<input type='button' id='myBtn'  onclick='loadForUpdate("
				+ currentList[i].id + ");'/>" + "</td>" +

				"<td>" + "<input type='button' onclick='deleteById("
				+ currentList[i].id + ");'/>" + "</td>" +
				"<td>" +
				
								  	 "<button " + onlineEvent + "  style='" + onlineButtonStyle + "' >"+
								  	 " <strong>On </strong>"+	
								  	"</button>"+
								  	
								  	 "<button " + offlineEvent + " style='" + offlineButtonStyle + "' >"+
								  	 " <strong>Off</strong>"+
								  	 "</button>"+
								  	 
								  	 "&nbsp;&nbsp;&nbsp;&nbsp;" +
								  	 ((currentList[i].fileName!=null)?
								  			 "<a href='/centauri/courses/" + currentList[i].fileName + " ' onclick='return initializeCode("+currentList[i].code+");' target='_blank'>Apri Pagina</a>"
//								  			 "<input type='button' id='redirect' value='Apri Pagina' onclick='redirectCandidati("+currentList[i].fileName+","+currentList[i].code+");'>"
								  			 :"" )+
								//  	/courses/ da aggiungere dopo href
				"</td>" +

				"<tr>";
		bodyTable += tmp;
	}

	var endTable = "</table>";
	$('#tableList').html(startTable + bodyTable + endTable);
}

var i = -1;
function colorArray() {

    var arr = new Array();
    arr[0] = "Red";
   
    arr[1] = "Green";
    
    i++;
    if (i > arr.length - 1) {
        i = 0;
    }
    localStorage.setItem("colorName", arr[i]);
    document.getElementById('color' ).style.backgroundColor = arr[i];
}

function setOnline (id) {
	var dataToInsert = {} ;
	$.ajax({
		type : 'PUT',
		url : resourceApi+"online/"+id,
		data : JSON.stringify(dataToInsert),
		contentType : 'application/json',
		statusCode: {
			200: function(data, textStatus, jQxhr){
				console.log("operation set Online successfull");
				console.log(data);
				refreshTable();
				noticeSuccess();
			},
			404: function(data, textStatus, jQxhr){
				console.log("operation failed");
				console.log(data);
				noticeWarn(data.responseJSON.errorMessage);
				}
		}
	});
}
//
//function openFile (id) {
//	var dataToInsert = {} ;
//	$.ajax({
//		type : 'PUT',
//		url : resourceApi+"open/"+id,
//		data : JSON.stringify(dataToInsert),
//		contentType : 'application/json',
//		statusCode: {
//			200: function(data, textStatus, jQxhr){
//				console.log("operation OpenFile successfull");
//				console.log(data);
//				noticeSuccess();
//			},
//			404: function(data, textStatus, jQxhr){
//				console.log("operation failed");
//				console.log(data);
//				noticeWarn(data.responseJSON.errorMessage);
//				}
//		}
//	});
//}

function setOffline (id) {
	var dataToInsert = {} ;
	$.ajax({
		type : 'PUT',
		url : resourceApi+"offline/"+id,
		data : JSON.stringify(dataToInsert),
		contentType : 'application/json',
		statusCode: {
			200: function(data, textStatus, jQxhr){
				console.log("operation set Offline successfull");
				console.log(data);
				refreshTable();
				noticeSuccess();
			},
			404: function(data, textStatus, jQxhr){
				console.log("operation failed");
				console.log(data);
				noticeWarn(data.responseJSON.errorMessage);
				}
		}
	});
}