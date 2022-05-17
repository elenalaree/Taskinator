var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

//Creates tasks

var taskFormHandler = function() {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type").value;
    
    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    };

    formEl.reset();
    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    
    //Send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
    
    
};

var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);
      // increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    //Edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //Delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);
    //task drop down
    var statusSelectEl = document.createElement("select");
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        //Option Element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    
};

var taskButtonHandler = function(event) {
    console.log(event.target);
    if (event.target.matches(".delete-btn")) {
        //getting the element task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

pageContentEl.addEventListener("click", taskButtonHandler);