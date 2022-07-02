const fs = require('fs')
const mustache = require('mustache')

/* Note - indentation has for variables containg main.js code must be indented this way to avoid formatting mishaps */

//Generate the .nextTask sequence at end of main.js
function generateTaskSequence(tasks) {
    let taskNames = Object.keys(tasks)
    let output = ""
    
    for (let i = 0; i < taskNames.length; i++) {
        if (i > 0) {
            output += 
            `
${taskNames[i-1]}.nextTask = function(){${taskNames[i]}.start();}
            `
            if ((i+1)==taskNames.length) {
                output += 
                `
${taskNames[i]}.nextTask = function(){demoTask.start();}
                `
            }
        }
        else {
            output += 
            `
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

// Generate text of main.js file, to be executed in index.js after POST request from client
exports.generateMain = function(tasks) {
    let taskNames = Object.keys(tasks)
    let output = 
`"use strict";
var subjID, IP;
var study = ${JSON.stringify(tasks[taskNames[taskNames.length-1]].studyName)};
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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
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
    
    for (let i = 0; i < taskNames.length; i++) {
        if (tasks[taskNames[i]].task_type == "consent") {
            output += 
            `
/////////////////////////
// CONSENT PAGE //
/////////////////////////

var ${taskNames[i]} = new Consent();
${taskNames[i]}.imagesToLoad = ${JSON.stringify(tasks[taskNames[i]].imagesToLoad)}
${taskNames[i]}.consentTitle = [${JSON.stringify(tasks[taskNames[i]].consentTitle)}];
${taskNames[i]}.consentText = [${JSON.stringify(tasks[taskNames[i]].consentText)}];
${taskNames[i]}.consentBold = [${JSON.stringify(tasks[taskNames[i]].consentBold)}];
            `
        }
        else if (tasks[taskNames[i]].task_type == "voteObj"){
            output += 
            `
//////////////////////////////
//    TRAIT VOTE TASK    //
//////////////////////////////

var ${taskNames[i]} = new voteObj();

${taskNames[i]}.name = '${taskNames[i]}';
${taskNames[i]}.prompt=${JSON.stringify(tasks[taskNames[i]].prompt)};
${taskNames[i]}.instructions=[${JSON.stringify(tasks[taskNames[i]].instructions)}]; 
${taskNames[i]}.trialScale = ${JSON.stringify(tasks[taskNames[i]].trialScale)};

var pics = ${JSON.stringify(tasks[taskNames[i]].picArray)};

${taskNames[i]}.picArray = shuffle(pics);
// These are for styling purpose (more properties can be found in Task.js && vote.js)
${taskNames[i]}.picHeight = ${tasks[taskNames[i]].picHeight};
${taskNames[i]}.background_color = 'white';
${taskNames[i]}.screen_color = 'white';
${taskNames[i]}.color = ${JSON.stringify(tasks[taskNames[i]].color)};
${taskNames[i]}.answerWidth = ${tasks[taskNames[i]].answerWidth}
${taskNames[i]}.fastRespCutTime = 750
${taskNames[i]}.feedbackTime = 2000
${taskNames[i]}.fontSize = ${tasks[taskNames[i]].fontSize}
            `
        }
    }

    output += generateTaskSequence(tasks)
    return output
}