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
            revisionItem.innerHTML = `<span>${task}</span> <button class="DeleteTaskButton" onclick="RemoveTask('${divID}', this)">&#10003</button>`;
            revisionList.appendChild(revisionItem);
        });
    });
    UpdateTaskCount();
}

// Add Task to Revision List.
// Save Task to Local Storage.
function AddItemToRevisionList(divID) {
    let revisionInput = document.querySelector(`#${divID} input`);
    if (!revisionInput || revisionInput.value.trim() === "") { alert("Please Enter Information."); return; }
    let revisionList = document.querySelector(`#${divID} .RevisionList`);
    let itemText = revisionInput.value.trim();
    let revisionItem = document.createElement("li");
    revisionItem.innerHTML = `<span>${itemText}</span> <button class="DeleteTaskButton" onclick="RemoveTask('${divID}', this)">&#10003</button>`;
    revisionList.appendChild(revisionItem);
    SaveTaskToLocalStorage(divID, itemText);
    revisionInput.value = "";
    UpdateTaskCount();
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
    alert("Nicely done! You finished " + taskText);
    UpdateTaskCount();
}

// Add Number of Tasks to Header Text
function AddTaskCountToHeaderText() {
    document.querySelectorAll(".SubjectCategory").forEach(subject => {
        let divID = subject.id;
        let revisionList = document.querySelector(`#${divID} .RevisionList`);
        let taskCount = revisionList.children.length;
        let divH2 = subject.querySelector("h2");
        if (divH2) {
            divH2.textContent = `${divID.toUpperCase()} (${taskCount})`;
        }
    });
}

function UpdateTaskCount() {
    AddTaskCountToHeaderText();
}

document.addEventListener("DOMContentLoaded", AddTaskCountToHeaderText);
document.addEventListener("DOMContentLoaded", LoadStoredTasks);