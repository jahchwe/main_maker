const ejs = require('ejs');
const fs = require('fs');

var myPrefix = 'foo';
var importObj = {a: 10}

const CONSENTTEMPLATE = `
/////////////////////////
// SET UP CONSENT PAGE //
/////////////////////////
var consentPage = new Consent();
consentPage.imagesToLoad = allimages;
consentPage.consentTitle = ['<%=consentTitle%>'];
consentPage.consentText = ['<%=consentText%>']; 
consentPage.consentBold = ['<%=consentBold%>'];
`

const VOTETEMPLATE = `
////////////////////////////
// SET UP THE RATING TASK //
////////////////////////////
var imageTask = new votePair();

// Change task-specific information here (more info can be found in Task.js && vote.js)
imageTask.name = "Similarity";
imageTask.prompt="How similar are the personalities of these two people?";		//voteTask.prompt="Answer the question below:";
imageTask.instructions=[
	'In this task, you will see two faces displayed side-by-side on your screen. Please think about what type of personality each person may have, if all you had to go off of was their face. <br><br> You have to indicate how similar the personalities of the two people are by making a selection on a scale of 1 (not similar at all) to 7 (extremely similar). <br><br> Please go with your gut reaction and respond as fast as you can.'
];

imageTask.trialScale = ["1. Not at all similar","2","3","4","5","6","7. Extremely similar"];
imageTask.picHeight = 250;
imageTask.background_color = 'white';
imageTask.screen_color = 'white';
imageTask.color = 'black';
imageTask.randomizeTrials = true;
imageTask.fastRespCutTime = 750
imageTask.feedbackTime = 2000

var selection = Array.from({length: 200}, () => Math.floor(Math.random() * 2926)); // 200 randomly generated integers
`

const DECISIONTEMPLATE = `
`


const TEMPLATE = `
"use strict";
var subjID, IP;
var study = "'<%=experimentName%>'";
subjID = getSubjID(7); 							// # is the length of subjID
preventTouch(); 

///////////////////////////
// SET UP SCREENING FORM //
///////////////////////////
var allimages = '<%=imagesToLoad%>';
var screenerTask = new Screener();
screenerTask.questions = [['MTurkID', 'bornUS', 'english']];
screenerTask.checkCustomEligibilities = function () {
    var race_sel = '';
    $('input:checkbox.race').each(function (i,box) {
        box.checked ? race_sel = race_sel + $(box).attr('name') + " " : "";
    });

if ($('input:radio[name=bornUS]:checked').val()=='yes'  && $('input:radio[name=english]:checked').val()=='yes'){
       return true;

    }
    return false;
}



// this isn't being shuffled. Furthermore, this does not support text, so need pictures of text of attn check
imageTask.picArray = [['press_1.jpeg', 'press_1.jpeg'], ['press_1.jpeg', 'press_1.jpeg'], ['press_1.jpeg', 'press_1.jpeg'], ['press_2.jpeg', 'press_2.jpeg'], ['press_2.jpeg', 'press_2.jpeg'], ['press_2.jpeg', 'press_2.jpeg'], ['press_3.jpeg', 'press_3.jpeg'], ['press_3.jpeg', 'press_3.jpeg'], ['press_3.jpeg', 'press_3.jpeg'], ['press_4.jpeg', 'press_4.jpeg'], ['press_4.jpeg', 'press_4.jpeg'], ['press_4.jpeg', 'press_4.jpeg'], ['press_5.jpeg', 'press_5.jpeg'], ['press_5.jpeg', 'press_5.jpeg'], ['press_5.jpeg', 'press_5.jpeg'], ['press_6.jpeg', 'press_6.jpeg'], ['press_6.jpeg', 'press_6.jpeg'], ['press_6.jpeg', 'press_6.jpeg'], ['press_7.jpeg', 'press_7.jpeg'], ['press_7.jpeg', 'press_7.jpeg'], ['press_7.jpeg', 'press_7.jpeg']];

for (let i = 0; i < selection.length; i++) {
  imageTask.picArray.push(totalPairs[selection[i]]); //use the random integers to create a subset of totalPairs (n=200)
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(imageTask.picArray)


//////////////////////////////////
// SET UP THE DEMOGRAPHICS TASK //
//////////////////////////////////
var demoTask = new demo();
demoTask.questions = [
	['age', 'gender', 'english'],
	['hispanic', 'race', 'sexOrientation']
];  // you could separate questions into multiple pages, list of questions in scripts/allQuestionList.js


/////////////////////////////////////
// DEFINE THE ORDER OF TASKS ABOVE //
/////////////////////////////////////
window.onload = function(){ screenerTask.start();}
screenerTask.nextTask = function () {
	if (this.eligible) {
		consentPage.start();
	} else {
		$('body').empty().html('Sorry, you are NOT eligible for this study. Please do NOT accept the HIT.').show();
	}
}
consentPage.nextTask = function(){ imageTask.start();}
imageTask.nextTask = function(){ demoTask.start();};
`;

let output = ejs.render(TEMPLATE, {Prefix: myPrefix, ImportObj: importObj});

fs.writeFile('/public/main.js', content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});