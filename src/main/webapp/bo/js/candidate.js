/**
 * validates the form to insert a new candidate
 * since the candidate entity hasn't any fields with constrains, there is no need to validate the form
 * so the function returns true
 */
function validateInsertForm() {
	return true ;
}

/**
 * validates the form to update a candidate
 * since the candidate entity hasn't any fields with constrains, there is no need to validate the form
 * so the function returns true
 */
function validateUpdateForm() {
	return true ;
}

/**
 * prepares the data to insert a new candidate
 */
function prepareDataToInsert(){
	var g=$('#graduate').is(':checked');
	var hg=$('#high_graduate').is(':checked');
	var shs=$('#still_high_study').is(':checked');
	var data = {"domicileCity" : $("#domicile_city").val(),
			"domicileStreetName" : $("#domicile_street_name").val(),
			"domicileHouseNumber" : $("#domicile_house_number").val(),
			"studyQualification" : $("#study_qualification").val(),
			"mobile" : $("#mobile").val(),
			"cvExternalPath" : $("#cv_external_path").val(),
			"graduate" : g,
			"highGraduate" : hg,
			"stillHighStudy" : shs,
			"userId": $("#userId").val()
	};
	return data ;
}

/**
 * prepares the data to update a candidate
 */
function prepareDataForUpdate(){
	var g=$('#graduate').is(':checked');
	var hg=$('#high_graduate').is(':checked');
	var shs=$('#still_high_study').is(':checked');
	var data = {"id" : $("#idCandidate").val(),
			"domicileCity" : $("#domicile_city").val(),
			"domicileStreetName" : $("#domicile_street_name").val(),
			"domicileHouseNumber" : $("#domicile_house_number").val(),
			"studyQualification" : $("#study_qualification").val(),
			"mobile" : $("#mobile").val(),
			"cvExternalPath" : $("#cv_external_path").val(),
			"graduate" : g,
			"highGraduate" : hg,
			"stillHighStudy" : shs,
			"userId" : $("#userId").val()
	};
	return data;
}

/**
 * initialize all the fields of the form with the current data of a candidate in order to be modified 
 */
function initializeEntityForUpdateDialog(data) {
	var userId=data.userId;
	$("#idCandidate").val(data.id);
	$("#userId").val(userId);
	$("#domicile_city").val(data.domicileCity);
	$("#domicile_street_name").val(data.domicileStreetName);
	$("#domicile_house_number").val(data.domicileHouseNumber);
	$("#study_qualification").val(data.studyQualification);
	$("#mobile").val(data.mobile);
	$("#cv_external_path").val(data.cvExternalPath);
	if(data.graduate==true)
		$("#graduate").prop('checked', true);
	else
		$("#graduate").prop('checked', false);
	if(data.highGraduate==true)
		$("#high_graduate").prop('checked', true);
	else
		$("#high_graduate").prop('checked', false);
	if(data.stillHighStudy==true)
		$("#still_high_study").prop('checked', true);
	else
		$("#still_high_study").prop('checked', false);
}

/**
 * creates a table with the informations of every candidate
 */
function createTable(currentList) {
	console.log("createTable invocato");
	retrieveUsersForUserSelection();	
	var startTable="<table><tr><th>Domicile City</th>" +
	"<th>Domicile Street Name</th>" +
	"<th>Domicile House Number</th>" +
	"<th>Study Qualification</th>" +
	"<th>Graduate</th>" +
	"<th>High Graduate</th>" +
	"<th>Still High Study</th>" +
	"<th>Mobile</th>" +
	"<th>CV External Path</th>"+
	"<th></th>"+
	"<th></th>"+"</tr>";
//	var startTable="<table><tr><th>candidate.table.domicile_city</th>" +
//			"<th>candidate.table.domicile_street_name</th>" +
//			"<th>candidate.table.domicile_house_number</th>" +
//			"<th>candidate.table.study_qualification</th>" +
//			"<th>candidate.table.graduate</th>" +
//			"<th>candidate.table.high_graduate</th>" +
//			"<th>candidate.table.still_high_study</th>" +
//			"<th>candidate.table.mobile</th>" +
//			"<th>candidate.table.cv_external_path</th></tr>";
	var bodyTable="";
	for(var i=0; i<currentList.length; i++){
		var tmp="<tr><td>" +currentList[i].domicileCity+ "</td>" +
				"<td>" +currentList[i].domicileStreetName+ "</td>" +
				"<td>" +currentList[i].domicileHouseNumber+ "</td>" +
				"<td>" +currentList[i].studyQualification+ "</td>" +
				"<td>" +currentList[i].graduate+ "</td>" +
				"<td>" +currentList[i].highGraduate+ "</td>" +
				"<td>" +currentList[i].stillHighStudy+ "</td>" +
				"<td>" +currentList[i].mobile+ "</td>" +
				"<td>" +currentList[i].cvExternalPath+ "</td>" +
				"<td>" +
				"<input type='button' onclick='deleteById(" +currentList[i].id+ ");'>" +
				"</td>" +
				"<td><input type='button' id='myBtn' onclick='loadForUpdate(" +currentList[i].id+ ");'></td></tr>";
		bodyTable+=tmp;
	}
	var endTable="</table>";
	$('#tableList').html(startTable + bodyTable + endTable);
}

/**
 * resets all the fields of the form in order to insert a new candidate 
 */
function resetFormFields() {
	$("#domicile_city").val('');
	$("#domicile_street_name").val('');
	$("#domicile_house_number").val('');
	$("#study_qualification").val('');
	$("#mobile").val('');
	$("#cv_external_path").val('');
	$('#graduate').prop('checked',false);
	$("#high_graduate").prop('checked',false);
	$("#still_high_study").prop('checked',false);
}

