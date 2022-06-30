const fs = require('fs')
const mustache = require('mustache')



const mainTemplate = `
"use strict";
var subjID, IP;
var study = "${studyName}";
subjID = getSubjID(7); 							// # is the length of subjID

///////////////////////////
// SET UP SCREENING FORM //
///////////////////////////
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


// demo questions
var demoTask = new demo();
demoTask.questions = [
	['age', 'gender'],
	['hispanic', 'race', 'sexOrientation'],
	['education', 'religion']
];

// task sequence
window.onload = function(){ screenerTask.start();}
`

const consentTemplate = `
/////////////////////////
// CONSENT PAGE //
/////////////////////////

var consentPage = new Consent();
consentPage.imagesToLoad = 
consentPage.consentTitle = ['Study on Traits'];
consentPage.consentText = [
	'Welcome to the experiment! Thank you for your participation.',
  'In this study, you will complete several computer tasks. You will see task specific instructions as the study progresses.',
  'The whole experiment will take approximately 15 minutes to complete, although you will be given one hour to complete the task and enter your code into Mechanical Turk.'
	];
consentPage.consentBold = [
	'Please DO NOT use your browser\'s back or reload buttons!',
	'You will receive the code for Mechanical Turk at the end of the study.'
	];

`

const voteObjTemplate = `
//////////////////////////////
//    TRAIT VOTE TASK    //
//////////////////////////////

var TraitTask = new voteObj();

TraitTask.name = '{}';
TraitTask.prompt="Please rate how attractive the person in the photo appears.";
TraitTask.instructions=['We are interested in the perception of attractiveness in faces.',
'In this task, you will see a series of faces. Please rate each face on attractiveness using a scale from <b>1 (not at all trustworthy) to 7 (very trustworthy)</b>.',
'<b>Please pay close attention to the attractiveness of the faces, but go with your gut feeling.</b> Do not spend a lot of time on each face.',
'There will be attention checks in the task. If you are paying attention, these will be easy to complete.']; // you can add multiple pages of instructions
TraitTask.trialScale = ["1 - Not at all attractive","2","3", "4 - Neutral","5","6","7 - Very attractive"];

var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

var pics = 
'Please press 1',
'Please press 2',
'Please press 3',
'Please press 4',
'Please press 5',
'Please press 6',
'Please press 7',
'Please press 1',
'Please press 2',
'Please press 3'];

TraitTask.picArray = shuffle(pics);
// These are for styling purpose (more properties can be found in Task.js && vote.js)
TraitTask.picHeight = 350;
TraitTask.background_color = 'white';
TraitTask.screen_color = 'white';
TraitTask.color = 'black';
TraitTask.answerWidth = 90
TraitTask.fastRespCutTime = 750
TraitTask.feedbackTime = 2000
`

/* const decisionTaskTemplate = ``

const voteObjMultiCompTemplate = ``

const DecisionMultiCompTemplate = `` */

function generateTaskSequence(tasksObject) {
    let taskNames = Object.keys(tasksObject)
    let output = ""
    
    for (let i = 0; i < taskNames.length; i++) {
        if (i > 0) {
            output += `
            ${taskNames[i-1]}.nextTask = function(){${taskNames[i]}.start();}
            `
            if ((i+1)==taskNames.length) {
                output += `${taskNames[i-1]}.nextTask = function(){demoTask.start();}
                `
            }
        }
        else {
            output += `
            screenerTask.nextTask = function () {
                if (this.eligible) {
                    ${taskNames[i]}.start();
                } else {
                    $('body').empty().html('Sorry, you are NOT eligible for this study. Please do NOT accept the HIT.').show();
                }
            }
            `
        }
    }
    return output
}

function generateMain()