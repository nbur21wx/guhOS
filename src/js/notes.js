// notes.js
// This is where the notes are handled, it may not look the cleanest, but it works!
// This project was made for HackClub's Stardance Challenge.
// nbur21wx

var sidebar = document.querySelector("#sidebar");
var notesContent = document.querySelector("#notesContent");
var currentIndex = null;
var localStorageAvailable = false;

var notesRename = document.querySelector("#notesRename");
var notesDelete = document.querySelector("#notesDelete");

var renameOverlay = document.querySelector("#notesRenameOverlay");
var renameOverlayInner = document.querySelector("#notesRenameOverlayInner");
var renameInput = document.querySelector("#notesRenameInput");
var renameSave = document.querySelector("#notesRenameSave");
var renameCancel = document.querySelector("#notesRenameCancel");

var confirmOverlay = document.querySelector("#notesConfirmOverlay");
var confirmOverlayInner = document.querySelector("#notesConfirmOverlayInner");
var confirmYes = document.querySelector("#notesConfirmYes");
var confirmNo = document.querySelector("#notesConfirmNo");

var contentTemplate = [
    {
        title: "Hey!",
        date: "08/24/2026, 4:14:32 AM",
        content: `<p>Hey! Thanks for checking out guhOS!</p>
        Suppose I should tell you a little bit about myself...
        `
    },
    {
        title: "Note 2",
        date: "08/24/2026, 2:06:02 PM",
        content: `<h1 class="text-xl">This is a test of another note</h1>`
    }
];

var content = null;

function closeConfirmOverlay() {
    confirmOverlay.classList.remove("animate-fade-in");
    confirmOverlay.classList.add("animate-fade-out");
    confirmOverlayInner.classList.remove("animate-window-open");
    confirmOverlayInner.classList.add("animate-window-close");
    setTimeout(function() {
        confirmOverlay.classList.add("hidden");
        confirmOverlayInner.classList.remove("animate-window-close");
    }, 150);
}

function closeRenameOverlay() {
    renameOverlay.classList.remove("animate-fade-in");
    renameOverlay.classList.add("animate-fade-out");
    renameOverlayInner.classList.remove("animate-window-open");
    renameOverlayInner.classList.add("animate-window-close");
    setTimeout(function() {
        renameOverlay.classList.add("hidden");
        renameOverlayInner.classList.remove("animate-window-close");
    }, 150);
}

function renderSidebar() {
    sidebar.innerHTML = "";
    content.forEach((note, index) => {
        var newButton = document.createElement("button");
        newButton.classList.add("pl-3", "pr-3", "pb-1", "pt-1", "w-full", "cursor-pointer", "transition-all", "rounded-md");
        if (index === currentIndex) {
            newButton.classList.add("bg-amber-700");
        }
        newButton.innerHTML = `
            <p class="text-amber-300 m-0 text-left">${note.title}</p>
            <p class="text-amber-300/50 text-xs m-0 text-left">${note.date}</p>
        `;
        newButton.addEventListener("click", function() {
            setNotesContent(index);
        });
        sidebar.appendChild(newButton);
    });
}

function setNotesContent(index) {
    currentIndex = index;
    notesContent.innerHTML = content[index].content;
    notesContent.contentEditable = "true";
    notesDelete.classList.remove("hidden");
    notesRename.classList.remove("hidden");
    renderSidebar();
}

function saveCurrentEdit() {
    if (currentIndex !== null) {
        content[currentIndex].content = notesContent.innerHTML;
        saveNotes();
    }
}

function createNote() {
    saveCurrentEdit();
    var now = new Date();
    content.push({
        title: "New note",
        date: now.toLocaleString(),
        content: "<p>Start typing...</p>"
    });
    renderSidebar();
    setNotesContent(content.length - 1);
    saveNotes();
}

function deleteNote() {
    if (currentIndex === null) return;
    confirmOverlay.classList.remove("hidden");
    confirmOverlay.classList.remove("animate-fade-out");
    confirmOverlay.classList.add("animate-fade-in");
    confirmOverlayInner.classList.add("animate-window-open");
    
}

function performDelete() {
    if (currentIndex === null) return;
    content.splice(currentIndex, 1);
    currentIndex = null;
    renderSidebar();
    notesContent.contentEditable = "false";
    notesDelete.classList.add("hidden");
    notesRename.classList.add("hidden");
    notesContent.innerHTML = `
        <div class="w-full h-full relative grid grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr]">
            <div class="col-start-3 row-start-3 flex max-w-lg flex-col text-center">
                <h1 class="text-amber-300/50 text-xl font-bold">No note selected!</h1>
                <p class="text-amber-300/50">Select one from the sidebar!</p>
            </div>
        </div>
    `;
    closeConfirmOverlay();
    saveNotes();
}

function openRename() {
    if (currentIndex === null) return;
    renameInput.value = content[currentIndex].title;
    renameOverlay.classList.remove("hidden");
    renameOverlay.classList.remove("animate-fade-out");
    renameOverlay.classList.add("animate-fade-in");
    renameOverlayInner.classList.add("animate-window-open");
    renameInput.focus();
    renameInput.select();
}

function saveRename() {
    if (currentIndex !== null && renameInput.value.trim() !== "") {
        content[currentIndex].title = renameInput.value.trim();
        renderSidebar();
    }
    closeRenameOverlay();
    saveNotes();
}

confirmYes.addEventListener("click", performDelete);
confirmNo.addEventListener("click", function() {
    closeConfirmOverlay();
});
notesRename.addEventListener("click", openRename);
renameSave.addEventListener("click", saveRename);
renameCancel.addEventListener("click", function() {
    closeRenameOverlay();
});

renameInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        saveRename();
    }
});

notesContent.addEventListener("input", saveCurrentEdit);
document.querySelector("#notesNew").addEventListener("click", createNote);
document.querySelector("#notesDelete").addEventListener("click", deleteNote);



// TODO: persist `content` to localStorage

// this is a very rough implementation of browser storage and it may be very scuffed.

// function from mozilla docs
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x,x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException && 
            e.name === "QuotaExceededError" &&
            storage &&
            storage.length !== 0
        );
    }
}

if (storageAvailable("localStorage")) {
    localStorageAvailable = true;
} else {
    localStorageAvailable = false;
    window.alert("localStorage not available. Notes will not save.");
}

function getNotes() {
    if (localStorageAvailable === true) {
        if (localStorage.getItem("_nbur21wx_guhOSdata_notesContent") === null) {
            localStorage.setItem("_nbur21wx_guhOSdata_notesContent", JSON.stringify(contentTemplate));
            content = JSON.parse(localStorage.getItem("_nbur21wx_guhOSdata_notesContent"));
        } else {
            content = JSON.parse(localStorage.getItem("_nbur21wx_guhOSdata_notesContent"));
        }
    } else {
        content = contentTemplate;
    }
}

function saveNotes() {
    if (localStorageAvailable === true) {
        localStorage.setItem("_nbur21wx_guhOSdata_notesContent", JSON.stringify(content));
    }
}

getNotes();

renderSidebar();