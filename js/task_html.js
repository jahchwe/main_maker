var consent_form =
  '<form action="javascript:add_task();" id="task_inputs">' +
    '<!-- use this form shell to change contents depending on task selection. Will grab inputs via task type as a class attribute, store info via unique ids-->' +
    '<div id="form_shell">' +
      '<div class="form-group">' +
        '<label for="taskName">task name</label>' +
        '<input type="text" class="form-control consent" id="taskName" rows=5 disabled value="consent">' +
      '</div>' +
      '<div class="form-group">' +
        '<label for="imagesToLoad">images to load</label>' +
        '<textarea type="text" class="form-control consent" id="imagesToLoad" rows=5 required></textarea>' +
        '<small id="imagesToLoad_help" class="form-text text-muted">List all stim shown in experiment here. Will be processed by new lines. On mac, you can copy and paste files from Finder and they will autoformat to be delimited by a new line.</small>' +
      '</div>' +
      '<div class="form-group">' +
        '<label for="consentTitle">consent page title</label>' +
        '<input class="form-control consent" id="consentTitle" placeholder="Text at the top of the consent page. Simple. Ex: Study on Faces" required>' +
      '</div>' +
      '<div class="form-group">' +
        '<label for="consentText">consent page text</label>' +
        '<textarea type="text" class="form-control consent" id="consentText" rows=5 required></textarea>' +
        '<small id="consentText_help" class="form-text text-muted">Preliminary instructions for the task. Give a broad overview, give a timing estimate, give the number of parts of the experiment, etc. Each line here will be a new line in the experiment.</small>' +
      '</div>' +
      '<div class="form-group">' +
        '<label for="consentBold">bold text</label>' +
        '<textarea type="text" class="form-control consent" id="consentBold" rows=5 required>Please DO NOT use your back or reload buttons!&#13;&#10;You will receive the code for Mechanical Turk at the end of the study.</textarea>' +
        '<small id="consentBold_help" class="form-text text-muted">Text that will be highlighted on the consent page. The prefilled text is standard. Note the use of escape characters, what is put here will be rendered via JS as a string.</small>' +
      '</div>' +
      '<div>' +
        '<p id="unique_task_warning" style="color:red;">Please enter a unique task name. Cannot have more than one consent task.</p>' +
      '</div>' +
      '<button type="submit" id="add_task" class="btn btn-primary">Add</button>' +
    '</div>' +
  '</form>'


var voteObj_form = '<form action="javascript:add_task();" id="task_inputs">' +
'<!-- use this form shell to change contents depending on task selection. Will grab inputs via task type as a class attribute, store info via unique ids-->' +
'  <div id="form_shell">' +
'    <div class="form-group">' +
'      <label for="taskName">task name</label>' +
'      <input type="text" class="form-control voteObj" id="taskName">' +
'      <small id="taskName_help" class="form-text text-muted">Controls the naming of the task in the data and output file name on the server. No white space (use _)</small>' +
'    </div>' +
'    <div class="form-group">' +
'      <label for="picArray">stim</label>' +
'      <textarea type="text" class="form-control voteObj" id="picArray" rows=5 required></textarea>' +
'      <small id="picArray_help" class="form-text text-muted">List all stim for this task here. Trials are randomized across subjs within task. Will be processed by new lines. On mac, you can copy and paste files from Finder and they will autoformat to be delimited by a new line.</small>' +
'    </div>' +
'    <div class="form-group">' +
'      <label for="prompt">prompt</label>' +
'      <input class="form-control voteObj" id="prompt" required>' +
'      <small id="prompt_help" class="form-text text-muted">Prompt shown while completing the experiment. Ex: Rate the trustworthiness of the face.</small>' +
'    </div>' +
'    <div class="form-group">' +
'      <label for="instructions">instructions</label>' +
'      <textarea type="text" class="form-control voteObj" id="instructions" rows=5 required></textarea>' +
'      <small id="instructions_help" class="form-text text-muted">Instructions for this specific part of the experiment. Discuss task specifics, what they should be doing. Each new line will be a separate page of instructions.</small>' +
'    </div>' +
'    <div class="form-group">' +
'      <label for="picHeight">picHeight</label>' +
'      <input type="text" class="form-control voteObj" id="picHeight" required value=400>' +
'      <small id="picHeight_help" class="form-text text-muted">Controls how large stim will be. Honestly just need to fiddle with this one. Will differ depending on length of survey item/size of pic.</small>' +
'    </div>' +
'    <div class="form-group">' +
'      <label for="color">color</label>' +
'      <input type="text" class="form-control voteObj" id="color" required value=black>' +
'      <small id="color_help" class="form-text text-muted">Controls background color during task. Prob want this to just be <code>black</code> or <code>white</code>. Needs to be a string known to javascript/HTML.</small>' +
'    </div>' +
'    <div class="form-group">' +
'      <label for="fontSize">fontSize</label>' +
'      <input type="text" class="form-control voteObj" id="fontSize" required value=16>' +
'      <small id="fontSize_help" class="form-text text-muted">Font size of text stim (and prompt?). Unclear how this interacts with picHeight..</small>' +
'    </div>' +
'    <div class="form-group">' +
'      <label for="answerWidth">answerWidth</label>' +
'      <input type="text" class="form-control voteObj" id="answerWidth" required value=16>' +
'      <small id="answerWidth_help" class="form-text text-muted">Controls the width of the response buttons. Again, need to fiddle depending on the amount of text labeling your scale.</small>' +
'    </div>' +
'    <div class="form-group">' +
'      <label for="trialScale">trialScale</label>' +
'      <textarea type="text" class="form-control voteObj" id="trialScale" rows=5 required></textarea>' +
'      <small id="trialScale_help" class="form-text text-muted">List labels for your scale here, one per line.</small>' +
'    </div>' +
'    <div>' +
'      <p id="unique_task_warning" style="color:red;">Please enter a unique task name. Cannot have more than one consent task.</p>' +
'    </div>' +
'    <button type="submit" id="add_task" class="btn btn-primary">Add</button>' +
'  </div>' +
'</form>' 

var decisionTask_form = 'decision'
var voteObjMultiComp_form = 'voteMulti'
var DecisionMultiComp_form = 'DecisionMulti'
