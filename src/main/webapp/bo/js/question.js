/**
 * JavaScript for question's entyties.
 */
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

function validateForm() {
	console.log("validateQuestionForm invoked");

	resetValidationError();

	var count = 0;

	if ($('#label').val().length < 3) {
		console.log("invalid label");
		$('#labelError').show();
		$(document).ready(function() {
			$('#label').addClass('color');
		});

		count++;
	}

	// Answer A
	if ($('#ansa').val() == ""
			&& ($('#cansa1').prop('checked') || $('#cansa2').prop('checked'))) {
		console.log("ansa not compiled");
		$('#cansa1').prop('checked', false);
		$('#cansa2').prop('checked', false);
		$('#ansaError').show();
		$(document).ready(function() {
			$('#ansa').addClass('color');
		});

		count++;
	} else if ($('#ansa').val() != "" && $('#cansa1').prop('checked') == false
			&& $('#cansa2').prop('checked') == false) {
		console.log("cansa not compiled");
		$('#cansaError').show();
		$(document).ready(function() {
			$('#ansa').addClass('color');
		});

		count++;
	}

	// Answer B
	if ($('#ansb').val() == ""
			&& ($('#cansb1').prop('checked') || $('#cansb2').prop('checked'))) {
		console.log("ansb not compiled");
		$('#cansb1').prop('checked', false);
		$('#cansb2').prop('checked', false);
		$('#ansbError').show();
		$(document).ready(function() {
			$('#ansb').addClass('color');
		});

		count++;
	} else if ($('#ansb').val() != "" && $('#cansb1').prop('checked') == false
			&& $('#cansb2').prop('checked') == false) {
		console.log("cansb not compiled");
		$('#cansbError').show();
		$(document).ready(function() {
			$('#ansb').addClass('color');
		});

		count++;
	}

	// Answer C
	if ($('#ansc').val() == ""
			&& ($('#cansc1').prop('checked') || $('#cansc2').prop('checked'))) {
		console.log("ansc not compiled");
		$('#cansc1').prop('checked', false);
		$('#cansc2').prop('checked', false);
		$('#anscError').show();
		$(document).ready(function() {
			$('#ansc').addClass('color');
		});

		count++;
	} else if ($('#ansc').val() != "" && $('#cansc1').prop('checked') == false
			&& $('#cansc2').prop('checked') == false) {
		console.log("cansc not compiled");
		$('#canscError').show();
		$(document).ready(function() {
			$('#ansc').addClass('color');
		});

		count++;
	}

	// Answer D
	if ($('#ansd').val() == ""
			&& ($('#cansd1').prop('checked') || $('#cansd2').prop('checked'))) {
		console.log("ansd not compiled");
		$('#cansd1').prop('checked', false);
		$('#cansd2').prop('checked', false);
		$('#ansdError').show();
		$(document).ready(function() {
			$('#ansd').addClass('color');
		});

		count++;
	} else if ($('#ansd').val() != "" && $('#cansd1').prop('checked') == false
			&& $('#cansd2').prop('checked') == false) {
		console.log("cansd not compiled");
		$('#cansdError').show();
		$(document).ready(function() {
			$('#ansd').addClass('color');
		});

		count++;
	}

	// Answer E
	if ($('#anse').val() == ""
			&& ($('#canse1').prop('checked') || $('#canse2').prop('checked'))) {
		console.log("anse not compiled");
		$('#canse1').prop('checked', false);
		$('#canse2').prop('checked', false);
		$('#anseError').show();
		$(document).ready(function() {
			$('#anse').addClass('color');
		});

		count++;
	} else if ($('#anse').val() != "" && $('#canse1').prop('checked') == false
			&& $('#canse2').prop('checked') == false) {
		console.log("canse not compiled");
		$('#canseError').show();
		$(document).ready(function() {
			$('#anse').addClass('color');
		});

		count++;
	}

	// Answer F
	if ($('#ansf').val() == ""
			&& ($('#cansf1').prop('checked') || $('#cansf2').prop('checked'))) {
		console.log("ansf not compiled");
		$('#cansf1').prop('checked', false);
		$('#cansf2').prop('checked', false);
		$('#ansfError').show();
		$(document).ready(function() {
			$('#ansf').addClass('color');
		});

		count++;
	} else if ($('#ansf').val() != "" && $('#cansf1').prop('checked') == false
			&& $('#cansf2').prop('checked') == false) {
		console.log("cansf not compiled");
		$('#cansfError').show();
		$(document).ready(function() {
			$('#ansf').addClass('color');
		});

		count++;
	}

	// Answer G
	if ($('#ansg').val() == ""
			&& ($('#cansg1').prop('checked') || $('#cansg2').prop('checked'))) {
		console.log("ansg not compiled");
		$('#cansg1').prop('checked', false);
		$('#cansg2').prop('checked', false);
		$('#ansgError').show();
		$(document).ready(function() {
			$('#ansg').addClass('color');
		});

		count++;
	} else if ($('#ansg').val() != "" && $('#cansg1').prop('checked') == false
			&& $('#cansg2').prop('checked') == false) {
		console.log("cansg not compiled");
		$('#cansgError').show();
		$(document).ready(function() {
			$('#ansg').addClass('color');
		});

		count++;
	}

	// Answer H
	if ($('#ansh').val() == ""
			&& ($('#cansh1').prop('checked') || $('#cansh2').prop('checked'))) {
		console.log("ansh not compiled");
		$('#cansh1').prop('checked', false);
		$('#cansh2').prop('checked', false);
		$('#anshError').show();
		$(document).ready(function() {
			$('#ansh').addClass('color');
		});

		count++;
	} else if ($('#ansh').val() != "" && $('#cansh1').prop('checked') == false
			&& $('#cansh2').prop('checked') == false) {
		console.log("cansh not compiled");
		$('#canshError').show();
		$(document).ready(function() {
			$('#ansh').addClass('color');
		});

		count++;
	}

	// Result error found
	if (count == 0) {
		console.log("no error found");
		return true;
	} else {
		console.log("error found: " + count);
		return false;
	}
}

function prepareDataToInsert() {
	console.log("prepareDataToInsert invoked");

	var description;
	var fullAnswer;
	var ansa;
	var ansb;
	var ansc;
	var ansd;
	var anse;
	var ansf;
	var ansg;
	var ansh;

	var ca;
	var cb;
	var cc;
	var cd;
	var ce;
	var cf;
	var cg;
	var ch;

	if ($('#description').val() != "") {
		description = $('#description').val();
	}

	if ($('#fullAnswer').val() != "") {
		fullAnswer = $('#fullAnswer').val();
	}

	// Answer A
	if ($('#ansa').val() != "") {
		ansa = $('#ansa').val();
		var isChecked1 = $('#cansa1:checked').val() ? true : false;
		var isChecked2 = $('#cansa2:checked').val() ? true : false;

		if (isChecked1 & !isChecked2) {
			ca = true;
		} else {
			ca = false;
		}
	}

	// Answer B
	if ($('#ansb').val() != "") {
		ansb = $('#ansb').val();
		var isChecked3 = $('#cansb1:checked').val() ? true : false;
		var isChecked4 = $('#cansb2:checked').val() ? true : false;

		if (isChecked3 & !isChecked4) {
			cb = true;
		} else {
			cb = false;
		}
	}

	// Answer C
	if ($('#ansc').val() != "") {
		ansc = $('#ansc').val();
		var isChecked5 = $('#cansc1:checked').val() ? true : false;
		var isChecked6 = $('#cansc2:checked').val() ? true : false;

		if (isChecked5 & !isChecked6) {
			cc = true;
		} else {
			cc = false;
		}
	}

	// Answer D
	if ($('#ansd').val() != "") {
		ansd = $('#ansd').val();
		var isChecked7 = $('#cansd1:checked').val() ? true : false;
		var isChecked8 = $('#cansd2:checked').val() ? true : false;

		if (isChecked7 & !isChecked8) {
			cd = true;
		} else {
			cd = false;
		}
	}

	// Answer E
	if ($('#anse').val() != "") {
		anse = $('#anse').val();
		var isChecked9 = $('#canse1:checked').val() ? true : false;
		var isChecked10 = $('#canse2:checked').val() ? true : false;

		if (isChecked9 & !isChecked10) {
			ce = true;
		} else {
			ce = false;
		}
	}

	// Answer F
	if ($('#ansf').val() != "") {
		ansf = $('#ansf').val();
		var isChecked11 = $('#cansf1:checked').val() ? true : false;
		var isChecked12 = $('#cansf2:checked').val() ? true : false;

		if (isChecked11 & !isChecked12) {
			cf = true;
		} else {
			cf = false;
		}
	}

	// Answer G
	if ($('#ansg').val() != "") {
		ansg = $('#ansg').val();
		var isChecked13 = $('#cansg1:checked').val() ? true : false;
		var isChecked14 = $('#cansg2:checked').val() ? true : false;

		if (isChecked13 & !isChecked14) {
			cg = true;
		} else {
			cg = false;
		}
	}

	// Answer H
	if ($('#ansh').val() != "") {
		ansh = $('#ansh').val();
		var isChecked15 = $('#cansh1:checked').val() ? true : false;
		var isChecked16 = $('#cansh2:checked').val() ? true : false;

		if (isChecked15 & !isChecked16) {
			ch = true;
		} else {
			ch = false;
		}
	}

	var dataInsert = {
		"label" : $('#label').val(),
		"description" : description,
		"ansa" : ansa,
		"ansb" : ansb,
		"ansc" : ansc,
		"ansd" : ansd,
		"anse" : anse,
		"ansf" : ansf,
		"ansg" : ansg,
		"ansh" : ansh,
		"cansa" : ca,
		"cansb" : cb,
		"cansc" : cc,
		"cansd" : cd,
		"canse" : ce,
		"cansf" : cf,
		"cansg" : cg,
		"cansh" : ch,
		"fullAnswer" : fullAnswer
	}
	return dataInsert;
}

function prepareDataForUpdate() {
	console.log("prepareDataForUpdate invoked");

	var description;
	var fullAnswer;
	var ansa;
	var ansb;
	var ansc;
	var ansd;
	var anse;
	var ansf;
	var ansg;
	var ansh;

	var ca;
	var cb;
	var cc;
	var cd;
	var ce;
	var cf;
	var cg;
	var ch;

	if ($('#description').val() != "") {
		description = $('#description').val();
	}

	if ($('#fullAnswer').val() != "") {
		fullAnswer = $('#fullAnswer').val();
	}

	// Answer A
	if ($('#ansa').val() != "") {
		ansa = $('#ansa').val();
		var isChecked1 = $('#cansa1:checked').val() ? true : false;
		var isChecked2 = $('#cansa2:checked').val() ? true : false;

		if (isChecked1 & !isChecked2) {
			ca = true;
		} else {
			ca = false;
		}
	}

	// Answer B
	if ($('#ansb').val() != "") {
		ansb = $('#ansb').val();
		var isChecked3 = $('#cansb1:checked').val() ? true : false;
		var isChecked4 = $('#cansb2:checked').val() ? true : false;

		if (isChecked3 & !isChecked4) {
			cb = true;
		} else {
			cb = false;
		}
	}

	// Answer C
	if ($('#ansc').val() != "") {
		ansc = $('#ansc').val();
		var isChecked5 = $('#cansc1:checked').val() ? true : false;
		var isChecked6 = $('#cansc2:checked').val() ? true : false;

		if (isChecked5 & !isChecked6) {
			cc = true;
		} else {
			cc = false;
		}
	}

	// Answer D
	if ($('#ansd').val() != "") {
		ansd = $('#ansd').val();
		var isChecked7 = $('#cansd1:checked').val() ? true : false;
		var isChecked8 = $('#cansd2:checked').val() ? true : false;

		if (isChecked7 & !isChecked8) {
			cd = true;
		} else {
			cd = false;
		}
	}

	// Answer E
	if ($('#anse').val() != "") {
		anse = $('#anse').val();
		var isChecked9 = $('#canse1:checked').val() ? true : false;
		var isChecked10 = $('#canse2:checked').val() ? true : false;

		if (isChecked9 & !isChecked10) {
			ce = true;
		} else {
			ce = false;
		}
	}

	// Answer F
	if ($('#ansf').val() != "") {
		ansf = $('#ansf').val();
		var isChecked11 = $('#cansf1:checked').val() ? true : false;
		var isChecked12 = $('#cansf2:checked').val() ? true : false;

		if (isChecked11 & !isChecked12) {
			cf = true;
		} else {
			cf = false;
		}
	}

	// Answer G
	if ($('#ansg').val() != "") {
		ansg = $('#ansg').val();
		var isChecked13 = $('#cansg1:checked').val() ? true : false;
		var isChecked14 = $('#cansg2:checked').val() ? true : false;

		if (isChecked13 & !isChecked14) {
			cg = true;
		} else {
			cg = false;
		}
	}

	// Answer H
	if ($('#ansh').val() != "") {
		ansh = $('#ansh').val();
		var isChecked15 = $('#cansh1:checked').val() ? true : false;
		var isChecked16 = $('#cansh2:checked').val() ? true : false;

		if (isChecked15 & !isChecked16) {
			ch = true;
		} else {
			ch = false;
		}
	}

	var dataUpdate = {
		"id" : $('#idQuestion').val(),
		"label" : $('#label').val(),
		"description" : description,
		"ansa" : ansa,
		"ansb" : ansb,
		"ansc" : ansc,
		"ansd" : ansd,
		"anse" : anse,
		"ansf" : ansf,
		"ansg" : ansg,
		"ansh" : ansh,
		"cansa" : ca,
		"cansb" : cb,
		"cansc" : cc,
		"cansd" : cd,
		"canse" : ce,
		"cansf" : cf,
		"cansg" : cg,
		"cansh" : ch,
		"fullAnswer" : fullAnswer
	}
	return dataUpdate;
}

function initializeEntityForUpdateDialog(currentObj) {
	console.log("initializeEntityForUpdateDialog invoked");

	resetFormFields();

	$('#idQuestion').val(currentObj.id);
	$('#label').val(currentObj.label);
	$('#description').val(currentObj.description);
	$('#ansa').val(currentObj.ansa);
	$('#ansb').val(currentObj.ansb);
	$('#ansc').val(currentObj.ansc);
	$('#ansd').val(currentObj.ansd);
	$('#anse').val(currentObj.anse);
	$('#ansf').val(currentObj.ansf);
	$('#ansg').val(currentObj.ansg);
	$('#ansh').val(currentObj.ansh);
	if (currentObj.cansa) {
		$('#cansa1').prop('checked', true);
	} else if (currentObj.cansa == false) {
		$('#cansa2').prop('checked', true);
	}
	if (currentObj.cansb) {
		$('#cansb1').prop('checked', true);
	} else if (currentObj.cansb == false) {
		$('#cansb2').prop('checked', true);
	}
	if (currentObj.cansc) {
		$('#cansc1').prop('checked', true);
	} else if (currentObj.cansc == false) {
		$('#cansc2').prop('checked', true);
	}
	if (currentObj.cansd) {
		$('#cansd1').prop('checked', true);
	} else if (currentObj.cansd == false) {
		$('#cansd2').prop('checked', true);
	}
	if (currentObj.canse) {
		$('#canse1').prop('checked', true);
	} else if (currentObj.canse == false) {
		$('#canse2').prop('checked', true);
	}
	if (currentObj.cansf) {
		$('#cansf1').prop('checked', true);
	} else if (currentObj.cansf == false) {
		$('#cansf2').prop('checked', true);
	}
	if (currentObj.cansg) {
		$('#cansg1').prop('checked', true);
	} else if (currentObj.cansg == false) {
		$('#cansg2').prop('checked', true);
	}
	if (currentObj.cansh) {
		$('#cansh1').prop('checked', true);
	} else if (currentObj.cansh == false) {
		$('#cansh2').prop('checked', true);
	}
	$('#fullAnswer').val(currentObj.fullAnswer);
}

function createTable(currentList) {
	console.log("createTable invoked");

	var startTable = "<table><tr><th>question.table.label</th><th>question.table.description</th><th>question.table.fullanswer</th><th></th><th></th></tr>"
	var bodyTable = "";
	for (var i = 0; i < currentList.length; i++) {
		var tmp = "<tr><td>"
				+ currentList[i].label
				+ "</td>"
				+ "<td>"
				+ currentList[i].description
				+ "</td>"
				+ "<td>"
				+ currentList[i].fullAnswer
				+ "</td>"
				+ "<td>"
				+ "<input type='button' onclick='deleteById("
				+ currentList[i].id
				+ ");'>"
				+ "</td>"
				+ "<td><input type='button' id='myBtn'  onclick='loadForUpdate("
				+ currentList[i].id + ");'>" + "</td><tr>";
		bodyTable += tmp;
	}
	var endTable = "</table>"
	$('#tableList').html(startTable + bodyTable + endTable);
}

function resetFormFields() {
	console.log("resetFormFields invoked");

	$('#label').val("");
	$('#description').val("");
	$('#ansa').val("");
	$('#ansb').val("");
	$('#ansc').val("");
	$('#ansd').val("");
	$('#anse').val("");
	$('#ansf').val("");
	$('#ansg').val("");
	$('#ansh').val("");
	$('#fullAnswer').val("");
	$('#cansa1').prop('checked', false);
	$('#cansa2').prop('checked', false);
	$('#cansb1').prop('checked', false);
	$('#cansb2').prop('checked', false);
	$('#cansc1').prop('checked', false);
	$('#cansc2').prop('checked', false);
	$('#cansd1').prop('checked', false);
	$('#cansd2').prop('checked', false);
	$('#canse1').prop('checked', false);
	$('#canse2').prop('checked', false);
	$('#cansf1').prop('checked', false);
	$('#cansf2').prop('checked', false);
	$('#cansg1').prop('checked', false);
	$('#cansg2').prop('checked', false);
	$('#cansh1').prop('checked', false);
	$('#cansh2').prop('checked', false);

	resetValidationError();

	$('#detailModal').show();
}

function resetValidationError() {
	console.log("resetValidationError invoked");

	// Label
	$('#labelError').hide();
	$(document).ready(function() {
		$('#label').removeClass('color');
	});

	// Answer A
	$('#ansaError').hide();
	$('#cansaError').hide();
	$(document).ready(function() {
		$('#ansa').removeClass('color');
	});

	// Answer B
	$('#ansbError').hide();
	$('#cansbError').hide();
	$(document).ready(function() {
		$('#ansb').removeClass('color');
	});

	// Answer C
	$('#anscError').hide();
	$('#canscError').hide();
	$(document).ready(function() {
		$('#ansc').removeClass('color');
	});

	// Answer D
	$('#ansdError').hide();
	$('#cansdError').hide();
	$(document).ready(function() {
		$('#ansd').removeClass('color');
	});

	// Answer E
	$('#anseError').hide();
	$('#canseError').hide();
	$(document).ready(function() {
		$('#anse').removeClass('color');
	});

	// Answer F
	$('#ansfError').hide();
	$('#cansfError').hide();
	$(document).ready(function() {
		$('#ansf').removeClass('color');
	});

	// Answer G
	$('#ansgError').hide();
	$('#cansgError').hide();
	$(document).ready(function() {
		$('#ansg').removeClass('color');
	});

	// Answer H
	$('#anshError').hide();
	$('#canshError').hide();
	$(document).ready(function() {
		$('#ansh').removeClass('color');
	});

}