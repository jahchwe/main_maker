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
        '<textarea type="text" class="form-control consent" id="imagesToLoad" rows=5 required>stim1.jpg\nstim2.jpg\nstim3.jpg</textarea>' +
        '<small id="imagesToLoad_help" class="form-text text-muted">List all stim shown in experiment here for preloading before tasks start. Will be processed by new lines. On mac, you can copy and paste files from Finder and they will autoformat to be delimited by a new line.</small>' +
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
'      <textarea type="text" class="form-control voteObj" id="picArray" rows=5 required>stim1.jpg\nstim2.jpg\nstim3.jpg\nHello, this is a text stim</textarea>' +
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
'      <textarea type="text" class="form-control voteObj" id="trialScale" rows=5 required>1\n2\n3</textarea>' +
'      <small id="trialScale_help" class="form-text text-muted">List labels for your scale here, one per line.</small>' +
'    </div>' +
'    <div>' +
'      <p id="unique_task_warning" style="color:red;">Please enter a unique task name. Cannot have more than one consent task.</p>' +
'    </div>' +
'    <button type="submit" id="add_task" class="btn btn-primary">Add</button>' +
'  </div>' +
'</form>' 

var decisionTask_form = '<form action="javascript:add_task();" id="task_inputs">' +
'              <!-- use this form shell to change contents depending on task selection. Will grab inputs via task type as a class attribute, store info via unique ids-->' +
'              <div id="form_shell">' +
'                <div class="form-group">' +
'                  <label for="taskName">task name</label>' +
'                  <input type="text" class="form-control Decision" id="taskName">' +
'                  <small id="taskName_help" class="form-text text-muted">Controls the naming of the task in the data and output file name on the server. No white space (use _)</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="timing_formula">timing formula</label>' +
'                  <input type="text" class="form-control Decision" id="timing_formula">' +
'                  <small id="timing_formula_help" class="form-text text-muted">Most important part of this type of experiment. A formula specifying timing. ex. <code>+/500,"1"/200, /100, RS, "2"/</code> will produce 500ms of fixation, stim of class 1 for 200ms, blank screen for 100, followed by stim of class 2 untimed. <code>RS</code> specifies when responses will be accepted. Here <code>"1"</code> and <code>"2"</code> are variables for different types of stim. Explained below. You can include a constant stim in this formula, make sure it also goes into the pictures folder on the server.</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="stimArray">stim</label>' +
'                  <textarea type="text" class="form-control Decision" id="stimArray" rows=5 required>This is a text stim of class 1&#13;&#10;thisIsStim1ofClass1.jpg&#13;&#10;thisIsStim2ofClass1.jpg&#13;&#10;thisIsStim3ofClass1.jpg&#13;&#10;---&#13;&#10;thisIsStim1ofClass2.jpg&#13;&#10;thisIsStim2ofClass2.jpg</textarea>' +
'                  <small id="stimArray_help" class="form-text text-muted">List all stim for this task here <strong>by class</strong>. All stim corresponding to a variable in the formula should be listed together in the corresponding order. Classes of stim should be separated by --- on a new line. See example in text box. Stim will be crossed. If there are 3 in class 1 and 2 in class 2, 6 trials will be made. Trials are randomized across subjs within task. Will be processed by new lines. On mac, you can copy and paste files from Finder and they will autoformat to be delimited by a new line.</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="prompt">prompt</label>' +
'                  <input class="form-control Decision" id="prompt" required>' +
'                  <small id="prompt_help" class="form-text text-muted">Prompt shown while completing the experiment. Ex: Rate the trustworthiness of the face.</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="instructions">instructions</label>' +
'                  <textarea type="text" class="form-control Decision" id="instructions" rows=5 required></textarea>' +
'                  <small id="instructions_help" class="form-text text-muted">Instructions for this specific part of the experiment. Discuss task specifics, what they should be doing. Each new line will be a separate page of instructions.</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="picHeight">picHeight</label>' +
'                  <input type="text" class="form-control Decision" id="picHeight" required value=400>' +
'                  <small id="picHeight_help" class="form-text text-muted">Controls how large stim will be. Honestly just need to fiddle with this one. Will differ depending on length of survey item/size of pic.</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="color">color</label>' +
'                  <input type="text" class="form-control Decision" id="color" required value=black>' +
'                  <small id="color_help" class="form-text text-muted">Controls background color during task. Prob want this to just be <code>black</code> or <code>white</code>. Needs to be a string known to javascript/HTML.</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="fontSize">fontSize</label>' +
'                  <input type="text" class="form-control Decision" id="fontSize" required value=16>' +
'                  <small id="fontSize_help" class="form-text text-muted">Font size of text stim (and prompt?). Unclear how this interacts with picHeight..</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="keyOptions">keyOptions</label>' +
'                  <textarea type="text" class="form-control Decision" id="keyOptions" rows=5 required>S&#13;&#10;K</textarea>' +
'                  <small id="keyOptions_help" class="form-text text-muted">Letters of the keys used for response. Separate by new line.</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="keyCodes">keyCodes</label>' +
'                  <textarea type="text" class="form-control Decision" id="keyCodes" rows=5 required>83&#13;&#10;75</textarea>' +
'                  <small id="keyCodes_help" class="form-text text-muted">Keyboard code corresponding to the letters of choice. Separate by new line. https://www.ascii-code.com/ use the DEC column.</small>' +
'                </div>' +
'                <div>' +
'                  <p id="unique_task_warning" style="color:red;">Please enter a unique task name. Cannot have more than one consent task.</p>' +
'                </div>' +
'                <button type="submit" id="add_task" class="btn btn-primary">Add</button>' +
'              </div>' +
'            </form>'




var voteObjMultiComp_form = '<form action="javascript:add_task();" id="task_inputs">' +
              '<!-- use this form shell to change contents depending on task selection. Will grab inputs via task type as a class attribute, store info via unique ids-->' +
              '  <div id="form_shell">' +
              '    <div class="form-group">' +
              '      <label for="taskName">task name</label>' +
              '      <input type="text" class="form-control voteObjMultiComp" id="taskName">' +
              '      <small id="taskName_help" class="form-text text-muted">Controls the naming of the task in the data and output file name on the server. No white space (use _)</small>' +
              '    </div>' +
              '    <div class="form-group">' +
              '      <label for="picArray">stim</label>' +
              '      <textarea type="text" class="form-control voteObjMultiComp" id="picArray" rows=5 required>thisIsStim1.jpg//<b>Richard</b>&#13;&#10;thisIsStim2.jpg//<b>Susan</b>&#13;&#10;thisIsStim3.jpg//<b>James</b></textarea>' +
              '      <small id="picArray_help" class="form-text text-muted">List all stim for this task here, followed by the corresponding text in HTML using a // line. Trials are randomized across subjs within task. Will be processed by new lines. On mac, you can copy and paste files from Finder and they will autoformat to be delimited by a new line.</small>' +
              '    </div>' +
              '    <div class="form-group">' +
              '      <label for="prompt">prompt</label>' +
              '      <input class="form-control voteObjMultiComp" id="prompt" required>' +
              '      <small id="prompt_help" class="form-text text-muted">Prompt shown while completing the experiment. Ex: Rate the trustworthiness of the face.</small>' +
              '    </div>' +
              '    <div class="form-group">' +
              '      <label for="instructions">instructions</label>' +
              '      <textarea type="text" class="form-control voteObjMultiComp" id="instructions" rows=5 required></textarea>' +
              '      <small id="instructions_help" class="form-text text-muted">Instructions for this specific part of the experiment. Discuss task specifics, what they should be doing. Each new line will be a separate page of instructions.</small>' +
              '    </div>' +
              '    <div class="form-group">' +
              '      <label for="picHeight">picHeight</label>' +
              '      <input type="text" class="form-control voteObjMultiComp" id="picHeight" required value=400>' +
              '      <small id="picHeight_help" class="form-text text-muted">Controls how large stim will be. Honestly just need to fiddle with this one. Will differ depending on length of survey item/size of pic.</small>' +
              '    </div>' +
              '    <div class="form-group">' +
              '      <label for="color">color</label>' +
              '      <input type="text" class="form-control voteObjMultiComp" id="color" required value=black>' +
              '      <small id="color_help" class="form-text text-muted">Controls background color during task. Prob want this to just be <code>black</code> or <code>white</code>. Needs to be a string known to javascript/HTML.</small>' +
              '    </div>' +
              '    <div class="form-group">' +
              '      <label for="fontSize">fontSize</label>' +
              '      <input type="text" class="form-control voteObjMultiComp" id="fontSize" required value=16>' +
              '      <small id="fontSize_help" class="form-text text-muted">Font size of text stim (and prompt?). Unclear how this interacts with picHeight..</small>' +
              '    </div>' +
              '    <div class="form-group">' +
              '      <label for="answerWidth">answerWidth</label>' +
              '      <input type="text" class="form-control voteObjMultiComp" id="answerWidth" required value=16>' +
              '      <small id="answerWidth_help" class="form-text text-muted">Controls the width of the response buttons. Again, need to fiddle depending on the amount of text labeling your scale.</small>' +
              '    </div>' +
              '    <div class="form-group">' +
              '      <label for="trialScale">trialScale</label>' +
              '      <textarea type="text" class="form-control voteObjMultiComp" id="trialScale" rows=5 required>1\n2\n3</textarea>' +
              '      <small id="trialScale_help" class="form-text text-muted">List labels for your scale here, one per line.</small>' +
              '    </div>' +
              '    <div>' +
              '      <p id="unique_task_warning" style="color:red;">Please enter a unique task name. Cannot have more than one consent task.</p>' +
              '    </div>' +
              '    <button type="submit" id="add_task" class="btn btn-primary">Add</button>' +
              '  </div>' +
              '</form>'
var DecisionMultiComp_form = '<form action="javascript:add_task();" id="task_inputs">' +
'              <!-- use this form shell to change contents depending on task selection. Will grab inputs via task type as a class attribute, store info via unique ids-->' +
'              <div id="form_shell">' +
'                <div class="form-group">' +
'                  <label for="taskName">task name</label>' +
'                  <input type="text" class="form-control DecisionMultiComp" id="taskName">' +
'                  <small id="taskName_help" class="form-text text-muted">Controls the naming of the task in the data and output file name on the server. No white space (use _)</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="timing_formula">timing formula</label>' +
'                  <input type="text" class="form-control DecisionMultiComp" id="timing_formula">' +
'                  <small id="timing_formula_help" class="form-text text-muted">Most important part of this type of experiment. A formula specifying timing. ex. <code>+/500,"1"/200, /100, RS, "2"/</code> will produce 500ms of fixation, stim of class 1 for 200ms, blank screen for 100, followed by stim of class 2 untimed. <code>RS</code> specifies when responses will be accepted. Here <code>"1"</code> and <code>"2"</code> are variables for different types of stim. Explained below. You can include a constant stim in this formula, make sure it also goes into the pictures folder on the server.</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="stimArray">stim</label>' +
'                  <textarea type="text" class="form-control DecisionMultiComp" id="stimArray" rows=5 required>thisIsStim1ofClass1.jpg//<b>Richard</b>/&#13;&#10;thisIsStim2ofClass1.jpg//<b>Susan</b>/&#13;&#10;thisIsStim3ofClass1.jpg//<b>James</b>/&#13;&#10;---&#13;&#10;thisIsStim1ofClass2.jpg//<i>Patricia</i>/&#13;&#10;thisIsStim2ofClass2.jpg//<i>Grace</i>/</textarea>' +
'                  <small id="stimArray_help" class="form-text text-muted">List all stim for this task here <strong>by class</strong>. Stim should contain the name of an image followed by "//", the text intended to be paired with the image in HTML, and then a final "/". All stim corresponding to a variable in the formula should be listed together in the corresponding order. Classes of stim should be separated by --- on a new line. See example in text box. Stim will be crossed. If there are 3 in class 1 and 2 in class 2, 6 trials will be made. Trials are randomized across subjs within task. Will be processed by new lines. On mac, you can copy and paste files from Finder and they will autoformat to be delimited by a new line.</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="prompt">prompt</label>' +
'                  <input class="form-control DecisionMultiComp" id="prompt" required>' +
'                  <small id="prompt_help" class="form-text text-muted">Prompt shown while completing the experiment. Ex: Rate the trustworthiness of the face.</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="instructions">instructions</label>' +
'                  <textarea type="text" class="form-control DecisionMultiComp" id="instructions" rows=5 required></textarea>' +
'                  <small id="instructions_help" class="form-text text-muted">Instructions for this specific part of the experiment. Discuss task specifics, what they should be doing. Each new line will be a separate page of instructions.</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="picHeight">picHeight</label>' +
'                  <input type="text" class="form-control DecisionMultiComp" id="picHeight" required value=400>' +
'                  <small id="picHeight_help" class="form-text text-muted">Controls how large stim will be. Honestly just need to fiddle with this one. Will differ depending on length of survey item/size of pic.</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="color">color</label>' +
'                  <input type="text" class="form-control DecisionMultiComp" id="color" required value=black>' +
'                  <small id="color_help" class="form-text text-muted">Controls background color during task. Prob want this to just be <code>black</code> or <code>white</code>. Needs to be a string known to javascript/HTML.</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="fontSize">fontSize</label>' +
'                  <input type="text" class="form-control DecisionMultiComp" id="fontSize" required value=16>' +
'                  <small id="fontSize_help" class="form-text text-muted">Font size of text stim (and prompt?). Unclear how this interacts with picHeight..</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="keyOptions">keyOptions</label>' +
'                  <textarea type="text" class="form-control DecisionMultiComp" id="keyOptions" rows=5 required>S&#13;&#10;K</textarea>' +
'                  <small id="keyOptions_help" class="form-text text-muted">Letters of the keys used for response. Separate by new line.</small>' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="keyCodes">keyCodes</label>' +
'                  <textarea type="text" class="form-control DecisionMultiComp" id="keyCodes" rows=5 required>83&#13;&#10;75</textarea>' +
'                  <small id="keyCodes_help" class="form-text text-muted">Keyboard code corresponding to the letters of choice. Separate by new line. https://www.ascii-code.com/ use the DEC column.</small>' +
'                </div>' +
'                <div>' +
'                  <p id="unique_task_warning" style="color:red;">Please enter a unique task name. Cannot have more than one consent task.</p>' +
'                </div>' +
'                <button type="submit" id="add_task" class="btn btn-primary">Add</button>' +
'              </div>' +
'            </form>'
