function validateInsertForm() {
	return true ;
}

function validateUpdateForm() {
	return true ;
}

function prepareDataToInsert(){
	var g=$('#graduate').is(':checked');
	var hg=$('#high_graduate').is(':checked');
	var shs=$('#still_high_study').is(':checked');
	 var inputDate = $('#data').val();
     var d = new Date(inputDate);
	var data = {"domicileCity" : $("#domicile_city").val(),
			"domicileStreetName" : $("#domicile_street_name").val(),
			"domicileHouseNumber" : $("#domicile_house_number").val(),
			"studyQualification" : $("#study_qualification").val(),
			"graduate" : g,
			"highGraduate" : hg,
			"stillHighStudy" : shs,
			"mobile" : $("#mobile").val(),
//			"cvExternalPath" : null,
			"email" : $('#email').val(),
			"firstname" : $('#nome').val(),
			"lastname" : $('#cognome').val(),
			"dateOfBirth" : d,
//			"imgpath" : null
	};
	
	$.ajax({
		type : 'POST',
		url : resourceApi,
//		data : JSON.stringify(dataToInsert),
		data : data,
//		contentType : 'application/json',
		contentType : undefined,
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

function prepareDataForUpdate(){
	var g=$('#graduate').is(':checked');
	var hg=$('#high_graduate').is(':checked');
	var shs=$('#still_high_study').is(':checked');
	var inputDate = $('#data').val();
	var id = $("#idCandidate").val();
    var d = new Date(inputDate);
	var data = {
			"userId" : $("#userId").val(),
			"domicileCity" : $("#domicile_city").val(),
			"domicileStreetName" : $("#domicile_street_name").val(),
			"domicileHouseNumber" : $("#domicile_house_number").val(),
			"studyQualification" : $("#study_qualification").val(),
			"mobile" : $("#mobile").val(),
//			"cv_external_path" : $("#cv_external_path").val(),
			"graduate" : g,
			"highGraduate" : hg,
			"stillHighStudy" : shs,
			"email" : $('#email').val(),
			"firstname" : $('#nome').val(),
			"lastname" : $('#cognome').val(),
			"dateOfBirth" : d
//			"imgpath" : null
	};
	
	$.ajax({
		type : 'PUT',
		url : resourceApi + id,
		data : data,
		contentType : undefined,
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

function initializeEntityForUpdateDialog(data) {
	$("#idCandidate").val(data.id);
	$("#userId").val(data.userId);
	$('#email').val(data.email);
	$('#nome').val(data.firstname);
	$('#cognome').val(data.lastname);
	$('#data').val(data.dateOfBirth);
	$("#domicile_city").val(data.domicileCity);
	$("#domicile_street_name").val(data.domicileStreetName);
	$("#domicile_house_number").val(data.domicileHouseNumber);
	$("#study_qualification").val(data.studyQualification);
	$("#mobile").val(data.mobile);
//	$("#cv_external_path").val(data.cv_external_path);
	if(data.graduate==true)
		$("#graduate").prop('checked', true);
	else
		$("#graduate").prop('checked', false);
	if(data.high_graduate==true)
		$("#high_graduate").prop('checked', true);
	else
		$("#high_graduate").prop('checked', false);
	if(data.still_high_study==true)
		$("#still_high_study").prop('checked', true);
	else
		$("#still_high_study").prop('checked', false);
}

function createTable(currentList) {
	console.log("createTable invocato");

	
	var startTable="<table>" +
			"<tr>" +
				"<th>#</th>" +
				"<th>Email Address</th>"+
				"<th>firstname</th>" +
				"<th>lastname</th>" +
				"<th>date Of Birth</th>" +
				"<th>Domicile City</th>"+
				"<th>Domicile Street Name</th>" +
				"<th>Domicile House Number</th>" +
				"<th>Study Qualification</th>" +
				"<th>Graduate</th>" +
				"<th>High Graduate</th>" +
				"<th>Still High Graduate</th>" +
				"<th>Mobile</th>" +
				"<th>cvExternalPath</th>" +
				"<th></th>"+
				"<th></th>"+
			"</tr>";

	var bodyTable="";
	for(var i=0; i<currentList.length; i++){
		var tmp=
				"<tr>" +
					"<td><img id='imgUser' src='"+ currentList[i].imgpath +"' alt='prova' height='42' width='42'></td>"+
					"<td>" +currentList[i].email+ "</td>" +
					"<td>" +currentList[i].firstname+ "</td>" +
					"<td>" +currentList[i].lastname+ "</td>" +
					"<td>" +currentList[i].dateOfBirth+ "</td>" +
					"<td>" +currentList[i].domicileCity+ "</td>" +
					"<td>" +currentList[i].domicileStreetName+ "</td>" +
					"<td>" +currentList[i].domicileHouseNumber+ "</td>" +
					"<td>" +currentList[i].studyQualification+ "</td>" +
					"<td>" +currentList[i].graduate+ "</td>" +
					"<td>" +currentList[i].highGraduate+ "</td>" +
					"<td>" +currentList[i].stillHighStudy+ "</td>" +
					"<td>" +currentList[i].mobile+ "</td>" +
					"<td>" +currentList[i].cvExternalPath+ "</td>" +
					"<td>" +
						"<input type='button'  onclick='deleteById(" +currentList[i].id+ ");'>" +
						"</td>" +
						"<td><input type='button' id='myBtn'  onclick='loadForUpdate(" +currentList[i].id+ ");'></td>" +
				"</tr>";
		bodyTable+=tmp;
	}
	var endTable="</table>";
	$('#tableList').html(startTable + bodyTable + endTable);
}
		
function resetFormFields() {
	
	$('#email').val('');
	$('#nome').val('');
	$('#cognome').val('');
	$('#data').val('');
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