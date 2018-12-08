'use strict';

let attemptTime = 0; // seconds elapsed during attempt
let questionTime = 0; // seconds elapsed during this question
let totalTime = getTestTotalTime(); // seconds elapsed during all test
let attemptNumber = getTestAttemptNumber() + 1;
let questions = null;
let currentQuestionIndex = -1;
let answers = {};
let times = {}; // time spent for each question

function abortTest() {
	if (confirm("Are you sure you want to abort the test?")) {
		purgeTest();
		document.location.href = "/";
	}
}

function displayTimer() {
	questionTime += 1; // increase by 1 second ...
	attemptTime += 1;

	document.getElementById("questionTimer")
		.innerHTML = getMMSSString(questionTime); // ... and display
	document.getElementById("totalTimer")
		.innerHTML = getMMSSString(totalTime + attemptTime);
}

function showErrorLoadingTest() {
	let out = "Sorry .. it seems that you've not created the test yet!";
	out += " Please, head over <a href='new.html'>here</a> to create a new" +
		" one!";
	document.getElementById("test-canvas").innerHTML = out;

	document.getElementById("testHeader").innerHTML = "<section class=\"page-header\">\n" +
		"<h1 class=\"project-name\" align=\"center\">Ooops! Test not found!</h1>\n" +
		"</section>";

	$(".main-content").removeClass("test-content");
}

function getUserInputAnswerHTML() {
	return '<input type="number">';
}

function getPossibleAnswersHTML(answers) {
	let out = '';

	for (let j = 0; j < answers.length; j++) {
		if (answers[j].length > 0) {
			out += "<input type='checkbox'" +
				" name='group" + currentQuestionIndex + "' value='" + answers[j] + "'>  " + answers[j] + "<br>";
		}
	}

	return out;
}

function getTestCanvas() {
	let testCanvasHtml = "<form id='questionsForm'>"; // start form
	testCanvasHtml += "<h2>Question #" + (currentQuestionIndex + 1) + "</h2>";
	testCanvasHtml += "<img id='image" + currentQuestionIndex + "' src=''>";
	testCanvasHtml += "<h3>" + questions[currentQuestionIndex]["question"] + "</h3>";

	let answers = questions[currentQuestionIndex]["allAnswers"];
	if (answers.includes('…')) { // this requires user input
		testCanvasHtml += getUserInputAnswerHTML();
	} else {
		testCanvasHtml += getPossibleAnswersHTML(answers);
	}

	// submit button
	if (currentQuestionIndex === questions.length - 1) {
		testCanvasHtml += "<input style='margin-top: 8em;' type='button'" +
			" value='Submit'" +
			" onclick='submitTestAttempt()'></form>";
		testCanvasHtml += "<br><br>";
	}

	// next button
	if (currentQuestionIndex < questions.length - 1) {
		testCanvasHtml += "\n" +
			"        <button style=\"float: right;\" onclick=\"goToNextQuestion()\">Next</button>\n" +
			"    </div><br><br>";
	}

	return testCanvasHtml;
}

function setupTest() {
	questions = getTestQuestions();
	currentQuestionIndex = 0;
}

function populatePage() {
	document.getElementById("test-canvas").innerHTML = getTestCanvas();
	displayImageFromStorage("image" + currentQuestionIndex, "imageData" + currentQuestionIndex);
	loadAnswer();
}

function saveAnswer() {
	let formOptions = $("#questionsForm").find("input");
	let answered = new Set();

	for (let i = 0; i < formOptions.length; i++) {
		if (formOptions[i].type === 'number') {
			answered.add(formOptions[i].value);
		} else if (formOptions[i].type === 'checkbox') {
			if (formOptions[i].checked) {
				answered.add(formOptions[i].value);
			}
		}
	}

	answers[currentQuestionIndex] = answered;
	times[currentQuestionIndex] = questionTime;
}

function loadAnswer() {
	let previousTime = times[currentQuestionIndex];
	if (previousTime === undefined) {
		previousTime = 0;
	}

	questionTime = previousTime; // reset question timer

	let formOptions = $("#questionsForm").find("input");
	let hasAlreadyAnswered = false;
	for (let i = 0; i < formOptions.length; i++) {
		if (formOptions[i].value === answers[currentQuestionIndex]) {
			formOptions[i].checked = true;
			hasAlreadyAnswered = true;
		}
	}

	if (hasAlreadyAnswered) {
		for (let i = 0; i < formOptions.length; i++) {
			formOptions[i].disabled = "disabled";
		}
	}
}

function goToNextQuestion() {
	if (currentQuestionIndex < questions.length - 1) {
		saveAnswer();
		currentQuestionIndex += 1;
		populatePage();
	}
}

function loadPage() {
	if (isTestRunning() || isTestSubmit()) {
		setupTest();
		populatePage();
		setStatusRunning();
	} else {
		showErrorLoadingTest();
	}
}

function containSameStuff(as, bs) {
	if (as.size !== bs.size) {
		return false;
	}

	for (let a of as) {
		if (!bs.has(a)) {
			return false;
		}
	}

	for (let b of as) {
		if (!as.has(b)) {
			return false;
		}
	}

	return true;
}

function checkAnswers() {
	let results = [];
	let numWrongAnswers = 0;

	for (let i = 0; i < questions.length; i++) {
		if (!containSameStuff(answers[i], questions[i]["correctAnswers"])) {
			numWrongAnswers += 1;
			results.push(false);
		} else {
			results.push(true);
		}
	}

	setResults(results);
	return numWrongAnswers;
}

function endTest(numWrongAnswers) {
	setStatusFinished();
	if (numWrongAnswers === 0) {
		document.getElementById("test-canvas").innerHTML = "Simply wonderful!" +
			" You made it! Please, wait a few moments ...";
	} else {
		document.getElementById("test-canvas").innerHTML = "Ooops!" +
			" You made " + numWrongAnswers + " errors! -.-";
	}

	setTimeout(function () {
		window.location.href = "finish.html"
	}, 1000 * 3); // 3 seconds
}

function submitTestAttempt() {
	saveAnswer();
	setStatusSubmit();
	addTimeToTotal(attemptTime); // log attempt time
	logAttempt();
	saveAnswers(answers);
	setTimes(times);

	const nWrongAnswers = checkAnswers();
	endTest(nWrongAnswers);
}

function displayImageFromStorage(imageId, storageId) {
	let image = document.getElementById(imageId);
	let imageData = localStorage.getItem(storageId);
	if (imageData !== null) {
		image.src = atob(imageData);
	}
}

loadPage();
let timer = setInterval(displayTimer, 1000); // repeat this function each second

function pauseTest() {
	clearInterval(timer);  // stop updating time

	const doc = document.getElementById('resumePauseCell');
	doc.innerHTML = '<a onclick="resumeTest();" id="resumeAttemptButton" class="btn">Resume</a>';
}

function resumeTest() {
	timer = setInterval(displayTimer, 1000);

	const doc = document.getElementById('resumePauseCell');
	doc.innerHTML = '<a onclick="pauseTest();" id="startPauseAttemptButton" class="btn">Pause</a>';
}
