/**
 * 
 */

 var resourceSurvey = MAIN_BACKEND_LOCATION + '/api/v1/survey';
//number of the question showed
 var i;
var token = window.location.search.split("=")[1];
// survey's information
var question;
// array with the candidate's answers
var arrayAnswers = [];
var arrayAnswersInterview = new Array();
var startTime;
var afterSurvey;
var isInterview;
var START_API = MAIN_BACKEND_LOCATION + '/api/v1/surveyreplyrequest/start/';
var END_API =  MAIN_BACKEND_LOCATION + '/api/v1/surveyreplyrequest/end/';


/**
 * initialize the token of the candidate to retrieve all the survey's questions
 */
function initializetoken() {
	$('#survey').hide();
	$('#surveyMessage').hide();
	$("#token").val(token);

	flushAnswers();
}

/**
 * prepare the scenario to start the survey
 */
function prepareScenario() {
	$('#send').hide();
	$('#back').hide();
	setPagination();
	jumpToQuestion(1);
	var surveyLength = (question.questions != null) ? question.questions.length
			: question.interviews.length;
	for (j = 1; j <= surveyLength; j++) {
		$('#jump' + j + '').css({
			width : '50px',
			'padding-top' : '10px',
			'padding-bottom' : '10px'
		});
	}

	$('#pagination').show();
	$('#survey').show();

	var currentdate = new Date();
	startTime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1)
			+ "-" + currentdate.getDate() + "T" + currentdate.getHours() + ":"
			+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
}

/**
 * sets the buttons to jump from one questions to another
 */
function setPagination() {
	var button = '';
	var surveyLength = (question.questions != null) ? question.questions.length
			: question.interviews.length;

	for (j = 1; j <= surveyLength; j++) {
		button += "<input type='button' id='jump" + j + "' value='" + j
				+ "'onclick='jumpToQuestion(" + j + ");'>";
	}
	$('#pagination').html(button);
}

/**
 * perform the jump from one question to another selecting the button that is
 * currently being clicked
 */
function jumpToQuestion(j) {
	var n = i + 1;
	$('#jump' + n + '').css('background', '');
	$('#jump' + j + '').css('background', 'red');

	if (n != j) {
		if (n < j)
			while (n < j) {
				nextQuestion();
				n += 1;
			}
		else
			while (n > j) {
				previousQuestion();
				n -= 1;
			}
	}
	i = j - 1;
	showNextQuestion(question);
}

/**
 * empty all options from a question
 */
function flushAnswers() {
	$('#ansa').prop('checked', false);
	$('#ansb').prop('checked', false);
	$('#ansc').prop('checked', false);
	$('#ansd').prop('checked', false);
	$('#anse').prop('checked', false);
	$('#ansf').prop('checked', false);
	$('#ansg').prop('checked', false);
	$('#ansh').prop('checked', false);
	$('#ansi').prop('checked', false);
	$('#ansj').prop('checked', false);
}

function callPost(data) {
	console.log("sendCompiledStartSurvey invoked" + data.userTokenId);
	// var currentdate = new Date();
	// startTime = currentdate.getFullYear() + "-"
	// + (currentdate.getMonth()+1) + "-"
	// + currentdate.getDate() + "T"
	// + currentdate.getHours() + ":"
	// + currentdate.getMinutes() + ":"
	// + currentdate.getSeconds();

	var dataToSend = {
		"surveyId" : data.surveyId,
		"userId" : data.userId,
		"userTokenId" : data.userTokenId
	};

	console.log("Time :" + data.time);
	var timeSurvey = 60 * data.time, display = $('#time');
	startTimer(timeSurvey, display);

	if (data.interviews != null) {
		isInterview = true;
//		$.ajax({
//			type : 'POST',
//			url : START_API_INTERVIEW,
//			data : JSON.stringify(dataToSend),
//			contentType : 'application/json',
//			statusCode : {
//				// survey sent successfully
//				201 : function(data, textStatus, jQxhr) {
//					
//					console.log("send: operation successful");
//					console.log(data);
//					console.log(data.id);
//					$('#idSurveyReply').val(data.id);
//					showNextQuestion(question);
//					prepareScenario();
//				},
//
//				409 : function(data, textStatus, jQxhr) {
//					console.log("send: operation failed");
//				},
//
//				400 : function(data, textStatus, jQxhr) {
//					console.log("send: operation failed");
//				},
//
//				500 : function(textStatus, jQxhr) {
//					console.log("send: error into database");
//				}
//			}
//		});
	} else {
		isInterview = false;
	}

		$.ajax({
			type : 'POST',
			url : START_API,
			data : JSON.stringify(dataToSend),
			contentType : 'application/json',
			statusCode : {
				// survey sent successfully
				201 : function(data, textStatus, jQxhr) {
					
					console.log("send: operation successful");
					console.log(data);
					console.log(data.id);
					$('#idSurveyReply').val(data.id);
					showNextQuestion(question);
					prepareScenario();
				},

				409 : function(data, textStatus, jQxhr) {
					console.log("send: operation failed");
				},

				400 : function(data, textStatus, jQxhr) {
					console.log("send: operation failed");
				},

				500 : function(textStatus, jQxhr) {
					console.log("send: error into database");
				}
			}
		});
	
}
/**
 * gets the survey from the server
 */
function startSurvey() {

	var token = $("#token").val();
	console.log("startSurvey invoked");

	$.ajax({
		type : 'GET',
		url : resourceSurvey + "/getSurveyForCandidate/" + token,
		dataType : 'json',

		success : function(data, textStatus, jQxhr) {
			console.log("startSurvey: operation successful");
			$('#start').hide();
			question = data;
			afterSurvey = question.afterSurvey;
			console.log("question.expired : " + question.expired);
			$('#surveyID').val(question.surveyId);
			$('#userID').val(question.userId);
			$('#tokenID').val(question.userTokenId);
			if (question.errorCode == 1) {
				$('#survey').hide();
				$('#mess').html(question.invalidToken);
				$('#surveyMessage').show();
			} else if (question.errorCode == 2) {
				$('#survey').hide();
				$('#mess').html(question.expiredToken);
				$('#surveyMessage').show();
			} else if (question.errorCode == 0) {
				i = 0;
				callPost(question);

			}
		},
		failure : function(textStatus, jQxhr) {
			console.log("KO " + textStatus);
		}
	});
}

/**
 * shows the current question of the survey
 */
function showNextQuestion(data) {
	var n = i;
	n = n + 1;
	$('#question').html("DOMANDA N° " + n);

	if (!isInterview) {
		$('#idQuestion').val(data.questions[i].id);

		if (data.questions[i].label != null) {
			$('#label').html(data.questions[i].label);
		} else {
			$('#label').hide();
		}

		if (data.questions[i].description != null) {
			$('#description').html(data.questions[i].description);
		} else {
			$('#description').hide();
		}

		if (data.questions[i].ansa != null) {
			$('#optA').html(data.questions[i].ansa);
			$('#tabA').show();
		} else {
			$('#tabA').hide();
		}

		if (data.questions[i].ansb != null) {
			$('#optB').html(data.questions[i].ansb);
			$('#tabB').show();
		} else {
			$('#tabB').hide();
		}

		if (data.questions[i].ansc != null) {
			$('#optC').html(data.questions[i].ansc);
			$('#tabC').show();
		} else {
			$('#tabC').hide();
		}

		if (data.questions[i].ansd != null) {
			$('#optD').html(data.questions[i].ansd);
			$('#tabD').show();
		} else {
			$('#tabD').hide();
		}

		if (data.questions[i].anse != null) {
			$('#optE').html(data.questions[i].anse);
			$('#tabE').show();
		} else {
			$('#tabE').hide();
		}

		if (data.questions[i].ansf != null) {
			$('#optF').html(data.questions[i].ansf);
			$('#tabF').show();
		} else {
			$('#tabF').hide();
		}

		if (data.questions[i].ansg != null) {
			$('#optG').html(data.questions[i].ansg);
			$('#tabG').show();
		} else {
			$('#tabG').hide();
		}

		if (data.questions[i].ansh != null) {
			$('#optH').html(data.questions[i].ansh);
			$('#tabH').show();
		} else {
			$('#tabH').hide();
		}
		
		if (data.questions[i].ansh != null) {
			$('#optI').html(data.questions[i].ansi);
			$('#tabI').show();
		} else {
			$('#tabI').hide();
		}
		
		if (data.questions[i].ansh != null) {
			$('#optJ').html(data.questions[i].ansj);
			$('#tabJ').show();
		} else {
			$('#tabJ').hide();
		}
		setAnswersFields(arrayAnswers[i]);
	}

	else {

		$('#idQuestion').val(data.interviews[i].id);

		if (data.interviews[i].questionText != null) {
			$('#label').html(data.interviews[i].questionText);
		} else {
			$('#label').hide();
		}

		if (data.interviews[i].ansa != null) {
			$('#optA').html(data.interviews[i].ansa);
			$('#tabA').show();
		} else {
			$('#tabA').hide();
		}

		if (data.interviews[i].ansb != null) {
			$('#optB').html(data.interviews[i].ansb);
			$('#tabB').show();
		} else {
			$('#tabB').hide();
		}

		if (data.interviews[i].ansc != null) {
			$('#optC').html(data.interviews[i].ansc);
			$('#tabC').show();
		} else {
			$('#tabC').hide();
		}

		if (data.interviews[i].ansd != null) {
			$('#optD').html(data.interviews[i].ansd);
			$('#tabD').show();
		} else {
			$('#tabD').hide();
		}

		if (data.interviews[i].anse != null) {
			$('#optE').html(data.interviews[i].anse);
			$('#tabE').show();
		} else {
			$('#tabE').hide();
		}

		if (data.interviews[i].ansf != null) {
			$('#optF').html(data.interviews[i].ansf);
			$('#tabF').show();
		} else {
			$('#tabF').hide();
		}

		if (data.interviews[i].ansg != null) {
			$('#optG').html(data.interviews[i].ansg);
			$('#tabG').show();
		} else {
			$('#tabG').hide();
		}

		if (data.interviews[i].ansh != null) {
			$('#optH').html(data.interviews[i].ansh);
			$('#tabH').show();
		} else {
			$('#tabH').hide();
		}
		if (data.interviews[i].ansi != null) {
			$('#optI').html(data.interviews[i].ansi);
			$('#tabI').show();
		} else {
			$('#tabI').hide();
		}
		if (data.interviews[i].ansj != null) {
			$('#optJ').html(data.interviews[i].ansj);
			$('#tabJ').show();
		} else {
			$('#tabJ').hide();
		}
		setAnswersFields(arrayAnswers[i]); // TODO for interview
	}

}

/**
 * shows the next question of the survey
 */
function nextQuestion() {
	var surveyLength = (question.questions != null) ? question.questions.length
			: question.interviews.length;
	console.log(surveyLength);
	if (question.interviews != null) {
		saveInterviews(question.interviews[i].id);
	} else {
		saveAnswers(question.questions[i].id);
	}

	var n = i + 1;
	var j;
	$('#jump' + n + '').css('background', '');
	i += 1;
	j = i + 1;
	$('#jump' + j + '').css('background', 'red');

	if (i != surveyLength - 1) {
		$('#back').show();
		showNextQuestion(question);
	} else {
		$('#forward').hide();
		$('#back').show();
		showNextQuestion(question);
		$('#send').show();
	}
}

/**
 * shows the previous question of the survey
 */
function previousQuestion() {
	var surveyLength = (question.questions != null) ? question.questions.length
			: question.interviews.length;
	console.log(surveyLength);
	if (isInterview) {
		saveInterviews(question.interviews[i].id);
	} else {
		saveAnswers(question.questions[i].id);
	}
	var n = i + 1;
	var j;
	$('#jump' + n + '').css('background', '');
	i -= 1
	j = i + 1;
	$('#jump' + j + '').css('background', 'red');
	if (i == 0) {
		showNextQuestion(question);
		$('#forward').show();
		$('#send').hide();
		$('#back').hide();
	} else {
		showNextQuestion(question);
		$('#back').show();
		$('#forward').show();
		$('#send').hide();
	}
}

function saveInterviews(id) {
	
	var ca;
	var cb;
	var cc;
	var cd;
	var ce;
	var cf;
	var cg;
	var ch;
	var ci;
	var cj;

	if (question.interviews[i].ansa != null)
		ca = $('#ansa').is(':checked');
	else
		ca = null;

	if (question.interviews[i].ansb != null)
		cb = $('#ansb').is(':checked');
	else
		cb = null;

	if (question.interviews[i].ansc != null)
		cc = $('#ansc').is(':checked');
	else
		cc = null;

	if (question.interviews[i].ansd != null)
		cd = $('#ansd').is(':checked');
	else
		cd = null;

	if (question.interviews[i].anse != null)
		ce = $('#anse').is(':checked');
	else
		ce = null;

	if (question.interviews[i].ansf != null)
		cf = $('#ansf').is(':checked');
	else
		cf = null;

	if (question.interviews[i].ansg != null)
		cg = $('#ansg').is(':checked');
	else
		cg = null;

	if (question.interviews[i].ansh != null)
		ch = $('#ansh').is(':checked');
	else
		ch = null;
	
	if (question.interviews[i].ansi != null)
		ci = $('#ansi').is(':checked');
	else
		ci = null;
	
	if (question.interviews[i].ansj != null)
		cj = $('#ansj').is(':checked');
	else
		cj = null;

	var data = {
		"interviewId" : id,
		"cansa" : ca,
		"cansb" : cb,
		"cansc" : cc,
		"cansd" : cd,
		"canse" : ce,
		"cansf" : cf,
		"cansg" : cg,
		"cansh" : ch,
		"cansi" : ci,
		"cansj" : cj
	};

	arrayAnswers[i] = data;
	return arrayAnswers;
}

/**
 * save the answers in an array
 */
function saveAnswers(id) {

	var ca;
	var cb;
	var cc;
	var cd;
	var ce;
	var cf;
	var cg;
	var ch;

	if (question.questions[i].ansa != null)
		ca = $('#ansa').is(':checked');
	else
		ca = null;

	if (question.questions[i].ansb != null)
		cb = $('#ansb').is(':checked');
	else
		cb = null;

	if (question.questions[i].ansc != null)
		cc = $('#ansc').is(':checked');
	else
		cc = null;

	if (question.questions[i].ansd != null)
		cd = $('#ansd').is(':checked');
	else
		cd = null;

	if (question.questions[i].anse != null)
		ce = $('#anse').is(':checked');
	else
		ce = null;

	if (question.questions[i].ansf != null)
		cf = $('#ansf').is(':checked');
	else
		cf = null;

	if (question.questions[i].ansg != null)
		cg = $('#ansg').is(':checked');
	else
		cg = null;

	if (question.questions[i].ansh != null)
		ch = $('#ansh').is(':checked');
	else
		ch = null;

	var data = {
		"questionId" : id,
		"cansa" : ca,
		"cansb" : cb,
		"cansc" : cc,
		"cansd" : cd,
		"canse" : ce,
		"cansf" : cf,
		"cansg" : cg,
		"cansh" : ch
	};

	arrayAnswers[i] = data;
	return arrayAnswers;

}

/**
 * sets the fields of a question if the candidate has already answered it and he
 * wants to change something
 */
function setAnswersFields(dataToFields) {
	if (dataToFields != null) {
		if (dataToFields.cansa) {
			$('#ansa').prop('checked', true);
		} else {
			$('#ansa').prop('checked', false);
		}
		if (dataToFields.cansb) {
			$('#ansb').prop('checked', true);
		} else {
			$('#ansb').prop('checked', false);
		}
		if (dataToFields.cansc) {
			$('#ansc').prop('checked', true);
		} else {
			$('#ansc').prop('checked', false);
		}
		if (dataToFields.cansd) {
			$('#ansd').prop('checked', true);
		} else {
			$('#ansd').prop('checked', false);
		}
		if (dataToFields.canse) {
			$('#anse').prop('checked', true);
		} else {
			$('#anse').prop('checked', false);
		}
		if (dataToFields.cansf) {
			$('#ansf').prop('checked', true);
		} else {
			$('#ansf').prop('checked', false);
		}
		if (dataToFields.cansg) {
			$('#ansg').prop('checked', true);
		} else {
			$('#ansg').prop('checked', false);
		}
		if (dataToFields.cansh) {
			$('#ansh').prop('checked', true);
		} else {
			$('#ansh').prop('checked', false);
		}
		if (dataToFields.cansi) {
			$('#ansi').prop('checked', true);
		} else {
			$('#ansi').prop('checked', false);
		}
		if (dataToFields.cansj) {
			$('#ansj').prop('checked', true);
		} else {
			$('#ansj').prop('checked', false);
		}
	} else {
		flushAnswers();
	}
}

/**
 * send the survey
 */
function sendCompiledSurvey() {
	console.log("sendCompiledSurvey invoked");
	var currentdate = new Date();
	var id = $('#idSurveyReply').val();
	console.log("id " + id);

//	if(isInterview){
//		alert("ok");
//		saveInterviews(question.interviews[i].id);	
//		var data = {
//				"answers" : arrayAnswersInterview,
//				"userId" : $('#tokenID').val()
//				
//		}
//	}
	
	
//		$.ajax({
//			type : 'PUT',
//			url : END_API_INTERVIEW + id,
//			data : JSON.stringify(data),
//			contentType : 'application/json',
//			statusCode : {
//				// survey sent successfully
//				200 : function(data, textStatus, jQxhr) {
//					console.log("send: operation successful");
//					console.log(data);
//					$('#survey').hide();
//					$('#time').hide();
//					$('#mess').html(afterSurvey);
//					$('#surveyMessage').show();
//				},
//
//				409 : function(data, textStatus, jQxhr) {
//					console.log("send: operation failed");
//				},
//
//				400 : function(data, textStatus, jQxhr) {
//					console.log("send: operation failed");
//				},
//
//				500 : function(textStatus, jQxhr) {
//					console.log("send: error into database");
//				}
//			}
//		});

	
		if(isInterview){
			saveInterviews(question.interviews[i].id);	
			var data= {
					"interviewAnswers" : arrayAnswers,
					"userId" : $('#tokenID').val()

				};
		
		}
		else{
		
			var data= {
					"answers" : arrayAnswers,
					"userId" : $('#tokenID').val()

				};
		}
	
		
		
	
		
		$.ajax({
			type : 'PUT',
			url : END_API + id,
			data : JSON.stringify(data),
			contentType : 'application/json',
			statusCode : {
				// survey sent successfully
				200 : function(data, textStatus, jQxhr) {
					console.log("send: operation successful");
					console.log(data);
					$('#survey').hide();
					$('#time').hide();
					$('#mess').html(afterSurvey);
					$('#surveyMessage').show();
				},

				409 : function(data, textStatus, jQxhr) {
					console.log("send: operation failed");
				},

				400 : function(data, textStatus, jQxhr) {
					console.log("send: operation failed");
				},

				500 : function(textStatus, jQxhr) {
					console.log("send: error into database");
				}
			}
		});
	//}
}

function startTimer(duration, display) {
	var timer = duration, minutes, seconds;
	setInterval(function() {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.text(minutes + ":" + seconds);

		if (--timer < 0) {
			timer = duration;
		}
	}, 1000);
}