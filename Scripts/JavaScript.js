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

// Add Revision Item to Revision List
function AddItemToRevisionList(divID) {
    let revisionInput = document.querySelector(`#${divID} input`);
    if (!revisionInput || revisionInput.value.trim() === "") { alert("Please Enter Information."); return; }

    let revisionList = document.querySelector(`#${divID} .RevisionList`);
    let revisionItem = document.createElement("li");
    let itemText = revisionInput.value.trim();
    
    revisionItem.innerHTML = `<span>${itemText}</span> <button class="DeleteTaskButton" onclick="this.parentElement.remove()">X</button>`;
    revisionList.appendChild(revisionItem);

    revisionInput.value = "";
}
