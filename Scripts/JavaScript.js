// Replace H2 Texts with their respective DivIDs.
function ReplaceHeaderTexts() {
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".SubjectCategory").forEach(div => {
            const divID = div.id;
            const divH2 = div.querySelector("h2");
            if (divH2) {
                divH2.textContent = divID.toUpperCase();
            }
        });
    });
}
ReplaceHeaderTexts();

// Restore Tasks from Local Storage.
function LoadStoredTasks() {
    document.querySelectorAll(".SubjectCategory").forEach(subject => {
        let divID = subject.id;
        let revisionList = document.querySelector(`#${divID} .RevisionList`);
        let storedTasks = JSON.parse(localStorage.getItem(divID)) || [];
        storedTasks.forEach(task => {
            let revisionItem = document.createElement("li");
            let isCompleted = task.includes("(Completed)");
            revisionItem.innerHTML = `<button class="DeleteTaskButton" onclick="RemoveTask('${divID}', this)">X</button> 
                                      <span>${task}</span> 
                                      <button class="CompleteTaskButton" onclick="CompleteTask('${divID}', this)">&#10003</button>`;
            revisionList.appendChild(revisionItem);
        });
    });
    AddTaskCountToHeaderText();
}

// Add Task to Revision List.
// Save Task to Local Storage.
function AddItemToRevisionList(divID) {
    let revisionInput = document.querySelector(`#${divID} input`);
    if (!revisionInput || revisionInput.value.trim() === "") { alert("Please Enter A Task."); return; }
    let revisionList = document.querySelector(`#${divID} .RevisionList`);
    let itemText = revisionInput.value.trim();
    let revisionItem = document.createElement("li");
    revisionItem.innerHTML = `<button class="DeleteTaskButton" onclick="RemoveTask('${divID}', this)">X</button> 
                              <span>${itemText}</span> 
                              <button class="CompleteTaskButton" onclick="CompleteTask('${divID}', this)">&#10003</button>`;
    revisionList.appendChild(revisionItem);
    SaveTaskToLocalStorage(divID, itemText);
    revisionInput.value = "";
    AddTaskCountToHeaderText();
}

// Write Task to Local Storage.
function SaveTaskToLocalStorage(divID, task) {
    let storedTasks = JSON.parse(localStorage.getItem(divID)) || [];
    storedTasks.push(task);
    localStorage.setItem(divID, JSON.stringify(storedTasks));
}

// Remove Task from Revision List.
// Remove Task from Local Storage.
function RemoveTask(divID, buttonElement) {
    let taskText = buttonElement.parentElement.querySelector("span").textContent;
    buttonElement.parentElement.remove();
    let storedTasks = JSON.parse(localStorage.getItem(divID)) || [];
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem(divID, JSON.stringify(storedTasks));
    alert(taskText + " has been removed.");
    AddTaskCountToHeaderText();
}

// Mark task as completed.
function CompleteTask(divID, buttonElement) {
    let taskSpan = buttonElement.parentElement.querySelector("span");
    let taskText = taskSpan.textContent;
    if (!taskText.includes("(Completed)")) {
        taskSpan.textContent = taskText + " (Completed)";
        UpdateLocalStorageCompletion(divID, taskText);
    }
    AddTaskCountToHeaderText();
}

// Update local storage to reflect completed tasks.
function UpdateLocalStorageCompletion(divID, taskText) {
    let storedTasks = JSON.parse(localStorage.getItem(divID)) || [];
    let taskIndex = storedTasks.indexOf(taskText);
    if (taskIndex !== -1) {
        storedTasks[taskIndex] = taskText + " (Completed)";
        localStorage.setItem(divID, JSON.stringify(storedTasks));
    }
}

// Add Number of Completed Tasks and Total Tasks to Header Text
function AddTaskCountToHeaderText() {
    document.querySelectorAll(".SubjectCategory").forEach(subject => {
        let divID = subject.id;
        let revisionList = document.querySelector(`#${divID} .RevisionList`);
        let totalTaskCount = revisionList.children.length;
        let completedTaskCount = Array.from(revisionList.children).filter(item => item.textContent.includes("(Completed)")).length;
        let divH2 = subject.querySelector("h2");
        if (divH2) {
            let taskCompletionPercentage = Math.round((completedTaskCount / totalTaskCount) * 100);
            if (isNaN(taskCompletionPercentage)) { taskCompletionPercentage = 0; }
            if (totalTaskCount === 0)
                divH2.textContent = `${divID.toUpperCase()}`;
            else
                divH2.textContent = `${divID.toUpperCase()} (${taskCompletionPercentage}%)`;
        }
    });
}

document.addEventListener("DOMContentLoaded", AddTaskCountToHeaderText);
document.addEventListener("DOMContentLoaded", LoadStoredTasks);
