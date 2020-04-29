function validateInsertForm() {
	console.log(" ##### validateInsertForm() STARTED");
	return validateForm();
}

function validateUpdateForm() {
	console.log(" ##### validateUpdateForm() STARTED");
	return validateForm();
}

function validateForm() {
	resetValidationError();
	console.log(" ##### validateForm() STARTED");
	var userId = $('#userId').val();
	var surveyId = $('#surveyId').val();
	var k = 0;
	if (userId.length <= 0 || surveyId.length <= 0) {
		if (userId.length <= 0) {
			$("#UserIdError").show();
			$(document).ready(function(){	
				$("#userId").addClass('color');
		});
		
		}
		if (surveyId.length <= 0) {
			$("#SurveyIdError").show();
			$(document).ready(function(){	
				$("#surveyId").addClass('color');
		});
		}
		k++;
	}
	console.log("k = "+k);
	if (k == 0)
		return true;
	else
		return false;
}

function resetValidationError() {
	$("#UserIdError").hide();
	$(document).ready(function(){	
		$("#userId").removeClass('color');
		$("#surveyId").removeClass('color');
});	
	$("#SurveyIdError").hide();
}

function prepareDataToInsert() {
	var data = {
		"userId" : $('#userId').val(),
		"surveyId" : $('#surveyId').val(),
		"starttime" : $('#starttime').val(),
		"endtime" : $('#endtime').val(),
		"answers" : $('#answers').val(),
		"pdffilename" : $('#pdffilename').val(),
		"points" : $('#points').val()
	};
	return data;
}

function prepareDataForUpdate() {
	var data = {
		"id" : $('#idSurvRep').val(),
		"userId" : $('#userId').val(),
		"surveyId" : $('#surveyId').val(),
		"starttime" : $('#starttime').val(),
		"endtime" : $('#endtime').val(),
		"answers" : $('#answers').val(),
		"pdffilename" : $('#pdffilename').val(),
		"points" : $('#points').val()
	}
	return data;
}

function initializeEntityForUpdateDialog(data) {
	/* Prepopolo */
	$('#idSurvRep').val(data.id);
	$("#userId").val(data.userId);
	$("#surveyId").val(data.surveyId);
	$("#starttime").val(data.starttime);
	$("#endtime").val(data.endtime);
	$("#answers").val(data.answers);
	$("#pdffilename").val(data.pdffilename);
	$("#points").val(data.points);
}

function createTable(currentList) {
	console.log(" # createTable() STARTED");
	var startTable = "<table>" + "<tr>" + "<th>surveyreply.table.usid</th>"
			+ "<th>surveyreply.table.survid</th>"
			+ "<th>surveyreply.table.startt</th>"
			+ "<th>surveyreply.table.endt</th>"
			+ "<th>surveyreply.table.ans</th>"
			+ "<th>surveyreply.table.pdfname</th>"
			+ "<th>surveyreply.table.poin</th>" + "<th></th>" + "<th></th>"
			+ "</tr>"
	var bodyTable = "";
	for (var i = 0; i < currentList.length; i++) {
		var tmp = "<tr>" + "<td>"
				+ currentList[i].userId
				+ "</td>"
				+ "<td>"
				+ currentList[i].surveyId
				+ "</td>"
				+ "<td>"
				+ currentList[i].starttime
				+ "</td>"
				+ "<td>"
				+ currentList[i].endtime
				+ "</td>"
				+ "<td>"
				+ currentList[i].answers
				+ "</td>"
				+ "<td>"
				+ currentList[i].pdffilename
				+ "</td>"
				+ "<td>"
				+ currentList[i].points
				+ "</td>"
				+ "<td><input type='button' onclick='deleteById("
				+ currentList[i].id
				+ ");'></td>"
				+ "<td><input type='button' id='myBtn' onclick='loadForUpdate("
				+ currentList[i].id + ");'></td>" + "<tr>"

		bodyTable += tmp;
	}
	var endTable = "</table>";
	document.getElementById("tableList").innerHTML = startTable + bodyTable
			+ endTable; /* provvede a creare HTML e lo mette dentro all'elemnto indicizzato con "tableList", dunque gli passeremo una stringona che contine tutto il codice HTML */
}

function resetFormFields() {
	$('#idSurvRep').val("");
	$("#userId").val("");
	$("#surveyId").val("");
	$("#starttime").val("");
	$("#endtime").val("");
	$("#answers").val("");
	$("#pdffilename").val("");
	$("#points").val("");

	resetValidationError();
}
