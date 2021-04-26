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
        '<small id="imagesToLoad_help" class="form-text text-muted">List all stim shown in experiment here. Will be processed by new lines (<code>\n</code>). On mac, you can copy and paste files from Finder and they will autoformat to be delimited by a new line.</small>' +
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


var voteObj_form = 'vote'

var decisionTask_form = 'decision'
var voteObjMultiComp_form = 'voteMulti'
var DecisionMultiComp_form = 'DecisionMulti'
