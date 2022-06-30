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
  $.post("/request", all_tasks)

}