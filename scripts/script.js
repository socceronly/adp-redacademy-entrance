//ADP Entrance Evaluation - Red Academy

// **************************
// JSON Data for quizzes
// **************************
var text = `{
    "quizzes": [{
        "title": "Abstract Quiz",
        "questions": [{
            "question": "If two left handed people argue, which one is right?",
            "answers": [{
                "content": "The one on the right.",
                "value": false
            }, {
                "content": "The one on the left.",
                "value": true
            }, {
                "content": "The one with the gun.",
                "value": false
            }, {
                "content": "Tom.",
                "value": false
            }]
        }, {
            "question": "What does Google use if it can't find an answer on Google?",
            "answers": [{
                "content": "Bing",
                "value": false
            }, {
                "content": "Bang",
                "value": false
            }, {
                "content": "Bong",
                "value": false
            }, {
                "content": "Ask Jeeves",
                "value": true
            }]
        }, {
            "question": "What kind of pants do Mario and Luigi wear?",
            "answers": [{
                "content": "Dussault apparel slashed jeans",
                "value": false
            }, {
                "content": "Tapered bell bottoms",
                "value": false
            }, {
                "content": "Acid washed Guccis",
                "value": false
            }, {
                "content": "Denim denim denim",
                "value": true
            }]
        }]
    }, {
        "title": "Dev Quiz",
        "questions": [{
            "question": "How many programmers does it take to change a lightbulb?",
            "answers": [{
                "content": "x = x + 1",
                "value": false
            }, {
                "content": "undefined",
                "value": false
            }, {
                "content": "NaN === NaN",
                "value": false
            }, {
                "content": "None. It's a hardware problem.",
                "value": true
            }]
        }, {
            "question": "What's the object oriented way to become wealthy?",
            "answers": [{
                "content": "Inheritance",
                "value": true
            }, {
                "content": "Have some class",
                "value": false
            }, {
                "content": "Super props",
                "value": false
            }, {
                "content": "Wealth is subjective",
                "value": false
            }]
        }, {
            "question": "What should you do when a bug is sad?",
            "answers": [{
                "content": "Help it out of a bind",
                "value": false
            }, {
                "content": "Console it",
                "value": true
            }, {
                "content": "Express your feelings",
                "value": false
            }, {
                "content": "Be more responsive",
                "value": false
            }]
        }]
    }]
}`;
// ********************************
// Convert JSON Text into JS Object
// ********************************
var objQuizzes = JSON.parse(text);
//**********************
// Global Variables
//**********************
var currentQuiz;
var currentQuestion;
var currentScore;
var waitState;
//**********************
// Set initial visibilty of blocks
//**********************
visibleBlock("pickQuizz", "quizz","showUserScore");
	    document.getElementById("chooseQuiz0").innerHTML = objQuizzes.quizzes[0].title;
	    document.getElementById("chooseQuiz1").innerHTML = objQuizzes.quizzes[1].title; 
//***********************
//Pick a quizz function
//***********************
function pickYourQuizz(quizzNumber) {

		//Make Quizz Visible & Hide Welcome Screen
		visibleBlock("quizz", "showUserScore", "pickQuizz");

	    currentQuizz = quizzNumber;
	    currentQuestion = 0;
	    currentScore = 0;

	    setScore();
	    setQuestion();
}
//**********************
//Funct Set Question
//**********************
function setQuestion() {

	    // Set Quizz Name
	    document.getElementById("quizzTitle").innerHTML = objQuizzes.quizzes[currentQuizz].title;
	   	
	    // Set Initial Score
		setScore();

	    // Set Initial Question
	   	document.getElementById("quizzQuestion").innerHTML = objQuizzes.quizzes[currentQuizz].questions[currentQuestion].question;

	   	// Set Initial Answers
	    document.getElementById("answer0").innerHTML = objQuizzes.quizzes[currentQuizz].questions[currentQuestion].answers[0].content;
	    document.getElementById("answer1").innerHTML = objQuizzes.quizzes[currentQuizz].questions[currentQuestion].answers[1].content;
	    document.getElementById("answer2").innerHTML = objQuizzes.quizzes[currentQuizz].questions[currentQuestion].answers[2].content;
	    document.getElementById("answer3").innerHTML = objQuizzes.quizzes[currentQuizz].questions[currentQuestion].answers[3].content;
}
// ******************
// Function - End Quiz 
// ******************
function endQuizz() {
	showScore();
}
//*********************
// Function - Evaluate answer with picked function
//*********************
function pickAnswer(userResponse) {
	if(!waitState){

		if(objQuizzes.quizzes[currentQuizz].questions[currentQuestion].answers[userResponse].value)
		{
			currentScore += 1;
			currentQuestion ++;
			document.getElementsByClassName("answerWrapper" + userResponse)[0].style.background = "green";
			setScore();
		} else {
			currentQuestion ++;
			document.getElementsByClassName("answerWrapper" + userResponse)[0].style.background = "red";
		}
	    // Check if there are any more questions
		if (currentQuestion < objQuizzes.quizzes[currentQuizz].questions.length){
			// Set waitState so buttons do not work
			waitState = true;
			// wait 2 seconds to display result
			setTimeout(function(){ 
				waitState = false;
				document.getElementsByClassName("answerWrapper" + userResponse)[0].style.background = "gainsboro";
				setQuestion(); }, 2000);	
		} else {
			// Set waitState so buttons do not work
			waitState = true;
			// wait 2 seconds to display result
			setTimeout(function(){ 
				waitState = false; 
				document.getElementsByClassName("answerWrapper" + userResponse)[0].style.background = "gainsboro";
				endQuizz(); }, 2000);	
		}
	}
}
//***************
//Function - New quizz, reset variables and block visiblity
//***************
function reset() {
	visibleBlock("pickQuizz", "quizz", "showUserScore");
	currentQuestion =0;
	currentQuiz=0;
	currentScore= 0;
}
//*******************
// Function -  Switch the visibily of blocks 
//********************

function visibleBlock(showBlock, hideBlock1,hideBlock2) {
		document.getElementById(hideBlock2).style.display = "none";
	    document.getElementById(hideBlock1).style.display = "none";
	    document.getElementById(showBlock).style.display = "block";
	    console.log("VISIBLE BLOCK");
}
//*************************
//Function - set score
//*************************

function setScore(){

		console.log('got to setscore');
		document.getElementById("userScore").innerHTML = 'Your score is: ' + currentScore;
}
//********************
// Function - show the final score for the user and evaulate if they passed
//********************
function showScore() {

		visibleBlock("showUserScore", "quizz", "pickQuizz")
		if(currentScore / 3 > .5){
	    	document.getElementById("finalScore").innerHTML = 'You Passed! Your Score was ' + currentScore + " out of " + objQuizzes.quizzes[currentQuizz].questions.length;
		} else {
			document.getElementById("finalScore").innerHTML = 'You Failed! Your Score was ' + currentScore + " out of " + objQuizzes.quizzes[currentQuizz].questions.length;
		}
}	

