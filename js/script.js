Sortable.create(task_sorter, { 
    animation: 100, 
    group: 'list-1', 
    draggable: '.list-group-item',
    handle: '.list-group-item', sort: true, 
    filter: '.sortable-disabled', 
    chosenClass: 'active' 
});

task_form_dict = {'consent': consent_form, 'voteObj': voteObj_form, 'Decision': decisionTask_form, 'voteObjMultiComp': voteObjMultiComp_form, 'DecisionMultiComp': DecisionMultiComp_form}
// add task, the function for adding a task :)
// things this function does
// - store all form inputs as a dict
// - add draggable and droppable viz for task ordering

$('#unique_task_warning').hide()
all_tasks = {}

function changeTaskSelection() {
  let task_selection = $('#task_selector').val()
  $('#currentForm').empty()
  $('#currentForm').append(task_form_dict[task_selection])
  $('#unique_task_warning').hide()
}

//Start with default "voteObj" task selection
changeTaskSelection()
  
//manipulate form based on selector

$("#task_selector").change(function () {
  changeTaskSelection()
})

var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/script'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    // returns a URL you can use as a href
    return textFile;
  };

function add_task() {
  $('#unique_task_warning').hide()
  console.log('Adding...')
  // get current task selection from #task_selector
  // The name of the task selector will match the class label that will be used to create a dictionary of user input, to be made into a main.js file
  var task_selection = $('#task_selector').val()
  console.log(task_selection)

  // for all elements that contain the task selector as a class label, iterate through and store both the responses and the identifiers as a dictionary
  // crucially again, the identifiers match the task attributes that need to be specified in the main.js
  var task_id = null

  var form_elements = $('.' + task_selection)
  console.log(form_elements)
  // store info !! Note this can also (or should) be done with jquery .each

  //get task name
  task_id = $('#taskName').val()
  if (task_id in all_tasks) {
    $('#unique_task_warning').show()
    return
  }

  all_tasks[task_id] = {
    studyName:$('#experimentName').val()
  }

  for (var i = 0; i < form_elements.length; i++) {
    // form elements here is a large DOM element.
    var elementID = form_elements[i].id
    console.log(elementID)
    if (elementID == 'taskName') {
      continue;
    }
    // parse this DOM element using another jquery selector to get actual value inputted by user.
    var elementVal = $('#' + elementID).val()
    all_tasks[task_id][elementID] = elementVal
  }
  //store the type of task Here
  all_tasks[task_id]['task_type'] = task_selection
  // add element to task_sorter
  $('#task_sorter').append('<li class="list-group-item" id="sorter_item_' + task_id + '" name="'+ task_id +'"> ' + task_id + ' <button class="task_edit" type="button" id="'+ task_id + '">Edit</button> <button class="task_delete" type="button" id="'+ task_id+'" >Delete</button></li>')

  //add listeners to task delete and edit buttons
  //doing this every time a new task is added, not the most efficient but w/e
  attach_listeners()
}

function attach_listeners() {
    //remove data and list item
    $(".task_delete").click(function() {
      console.log('delete')
      var task_id = $(this).attr("id");
      delete all_tasks[task_id]
      $('#sorter_item_' + task_id).remove()
    });

    //load and populate fields based on edit button pressed
    //will store all task relevant html in separate JS file
    $(".task_edit").click(function() {
      console.log('edit')
      var task_id = $(this).attr("id")
      console.log(task_id)
      var task_type = all_tasks[task_id]['task_type']
      console.log(task_type)

      // change form to match type
      $('#currentForm').empty()
      $('#currentForm').append(task_form_dict[task_type])
      $('#unique_task_warning').hide()

      // iterate through stored info, and propogate that info back into the text boxes
      // can use jquery val selector to propogate info for both textareas and inputs
      for (let entry in all_tasks[task_id]) {
        $('#' + entry).val(all_tasks[task_id][entry])
      }
    })
}

function makeMain() {
  // iterate through stored task information
  // grab task order from sortable list

  task_order = []
  //crucially, this will be in the order that it appears on the screen
  $('li').each(function() {
    let list_id = this.id
    task_order.push(list_id.substring(12,))
  })
  console.log(task_order)
  console.log(all_tasks)

  // Format arrays of pictures/trial scales
  let taskNames = Object.keys(all_tasks)
  for (let i = 0; i < taskNames.length; i++) {
    if (all_tasks[taskNames[i]].task_type == "consent") {
      all_tasks[taskNames[i]].imagesToLoad = all_tasks[taskNames[i]].imagesToLoad.split("\n")
    }
    else {
      all_tasks[taskNames[i]].picArray = all_tasks[taskNames[i]].picArray.split("\n")
      all_tasks[taskNames[i]].trialScale = all_tasks[taskNames[i]].trialScale.split("\n")
    }
  }
  // Post all_tasks to server-side for writing the file
  var textbox = generateMain(all_tasks)

  var link = document.createElement('a');
  link.setAttribute('download', 'main.js');
  link.href = makeTextFile(textbox);
  document.body.appendChild(link);

  // wait for the link to be added to the document
  window.requestAnimationFrame(function () {
    var event = new MouseEvent('click');
    link.dispatchEvent(event);
    document.body.removeChild(link);
  });
}

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
function generateMain(tasks) {
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