function validateInsertForm() {
	console.log("validateInsertForm invoked");
	if (validateForm()) {
		return true;
	} else {
		return false;
	}
}
function validateUpdateForm(){
	if (validateForm()) {
		return true;
	} else {
		return false;
	}
}
function prepareDataToInsert(){
	var data = {  
			"surveyId" : $('#surveyId').val(),
			"questionId" : $('#questionId').val(),
			"position" : $('#position').val()
			};
	return data ;
}
function prepareDataForUpdate(){
	var data = {
			"id" : $('#idSurveyQuestion').val(),
			"surveyId" : $('#surveyId').val(),
			"questionId" : $('#questionId').val(),
			"position" : $('#position').val()
		};
	return data;
}
function initializeEntityForUpdateDialog(data){
	$('#idSurveyQuestion').val(data.id);
	$('#surveyId').val(data.surveyId);
	$('#questionId').val(data.questionId);
	$('#position').val(data.position);
	resetValidationError();
		
}

function createTable(currentList) {
	console.log("invocato createTable");
	var startTable = "<table>	<tr><th>surveyId</th><th>questionId</th><th>position</th><th></th>"
						+"<th></th></tr>";
	var bodyTable = "";
	for (var i = 0; i < currentList.length; i++) {
		var tmp = "<tr><td>"
				+ currentList[i].surveyId
				+ " </td>"
				+ "<td>"
				+ currentList[i].questionId
				+ "</td>"
				+ "<td>"
				+ ((currentList[i].position!=null)?currentList[i].position:"")
				+ "</td>"
				+ "<td>"
				+
				// "<form id='surveyquestionFormDelete" + currentList[i].id + "'
				// action='" + deleteAction + "' method='POST'>" +
				// "<input type='hidden' name='id' id='idSurveyQuestionDelete'
				// value='" + currentList[i].id + "'>" +
				"<input type='button'  onclick='deleteById("
				+ currentList[i].id
				+ ");'>"
				+
				// "</form>" +
				"</td><td><input type='button' id='myBtn' onclick='loadForUpdate("
				+ currentList[i].id + ");'>" + "</td><tr>";
		bodyTable += tmp;

	}
	var endTable = "</table>";
	$('#tableList').html(startTable + bodyTable + endTable);

}

function resetFormFields(){
	$('#idSurveyQuestion').val("");
	$('#surveyId').val("");
	$('#questionId').val("");
	$('#position').val("");
	resetValidationError();
//	$('#detailModal').show();
}

function validateForm() {
	resetValidationError();
	console.log("validateForm init");
	console.log(surveyId);
	console.log(questionId);
	console.log(position);
	var b = true;
	if(($('#surveyId').val() == null) || ($('#surveyId').val() <= 0)){
		console.log("validateForm if survey");
		$('#labelError1').show();
		$(document).ready(function(){
			$('#surveyId').addClass('color');		
	});
		b = false;
	} 
	
	if(($('#questionId').val() == null) || ($('#questionId').val() <= 0)){
		console.log("validateForm if question");
		$('#labelError2').show();
		$(document).ready(function(){
			$('#questionId').addClass('color');	
	});
		b = false;
	} 
	console.log("position " + $('#position').val());
//	if(($('#position').val() != null) && ($('#position').val() <= 0)){
	var currentPosition = $('#position').val() ;
	console.log("currentPosition.length: " + currentPosition.length);
	if (currentPosition.length>0){
		console.log("isNaN(currentPosition): " + isNaN(currentPosition));
		console.log("(!isNaN(currentPosition) &&(currentPosition < 1)): " + (!isNaN(currentPosition) &&(currentPosition < 1)));
		if(isNaN(currentPosition) ||
				(!isNaN(currentPosition) &&(currentPosition < 1))){
			console.log("validateForm if position");
			$('#labelError3').show();
			$(document).ready(function(){	
				$('#position').addClass('color');
		});
			b = false;
		}
	}
	console.log("validateForm end with: " + b);
	return b;
}

function resetValidationError(){
	console.log("resetValidationError invoked");
	$('#labelError1').hide();
	$('#labelError2').hide();
	$('#labelError3').hide();

	$(document).ready(function(){
		$('#surveyId').removeClass('color');
		$('#questionId').removeClass('color');
		$('#position').removeClass('color');//colora il testo
});

}