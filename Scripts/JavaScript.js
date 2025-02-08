// Replace H2 Text with ID.
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

// Function to Load Stored Tasks from localStorage
function LoadStoredTasks() {
    document.querySelectorAll(".SubjectCategory").forEach(subject => {
        let divID = subject.id;
        let revisionList = document.querySelector(`#${divID} .RevisionList`);

        // Retrieve stored tasks from localStorage
        let storedTasks = JSON.parse(localStorage.getItem(divID)) || [];

        // Populate tasks in the list
        storedTasks.forEach(task => {
            let revisionItem = document.createElement("li");
            revisionItem.innerHTML = `<span>${task}</span> 
                <button class="DeleteTaskButton" onclick="RemoveTask('${divID}', this)">X</button>`;
            revisionList.appendChild(revisionItem);
        });
    });
}

// Function to Add a Task
function AddItemToRevisionList(divID) {
    let revisionInput = document.querySelector(`#${divID} input`);
    if (!revisionInput || revisionInput.value.trim() === "") {
        alert("Please Enter Information.");
        return;
    }

    let revisionList = document.querySelector(`#${divID} .RevisionList`);
    let itemText = revisionInput.value.trim();
    
    let revisionItem = document.createElement("li");
    revisionItem.innerHTML = `<span>${itemText}</span> 
        <button class="DeleteTaskButton" onclick="RemoveTask('${divID}', this)">X</button>`;
    
    revisionList.appendChild(revisionItem);
    
    // Store the new task in localStorage
    SaveTaskToLocalStorage(divID, itemText);
    
    revisionInput.value = "";
}

// Function to Save a Task to localStorage
function SaveTaskToLocalStorage(divID, task) {
    let storedTasks = JSON.parse(localStorage.getItem(divID)) || [];
    storedTasks.push(task);
    localStorage.setItem(divID, JSON.stringify(storedTasks));
}

// Function to Remove a Task
function RemoveTask(divID, buttonElement) {
    let taskText = buttonElement.parentElement.querySelector("span").textContent;

    // Remove from UI
    buttonElement.parentElement.remove();

    // Remove from localStorage
    let storedTasks = JSON.parse(localStorage.getItem(divID)) || [];
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem(divID, JSON.stringify(storedTasks));
}

// Load stored tasks on page load
document.addEventListener("DOMContentLoaded", LoadStoredTasks);

