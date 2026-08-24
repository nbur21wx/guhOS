// notes.js
// This is where the notes are handled, it may not look the cleanest, but it works!
// This project was made for HackClub's Stardance Challenge.
// nbur21wx

var sidebar = document.querySelector("#sidebar");
var content = [
    {
        title: "Hey!",
        date: "08/24/2026 @ 4:14 AM",
        content: `<p>Hey! Thanks for checking out guhOS!</p>
        Suppose I should tell you a little bit about myself...
        `
    },
    {
        title: "Note 2",
        date: "08/24/2026 @ 2:06 PM",
        content: `<h1 class="text-xl">This is a test of another note</h1>`
    }
];
// TODO: Make the notes be stored in local browser storage

function setNotesContent(index) {
    // TODO: Make the notes editable
    var notesContent = document.querySelector("#notesContent");
    notesContent.innerHTML = content[index].content;
}

function addToSidebar(index) {
    var note = content[index];
    var newButton = document.createElement("button");
    newButton.classList.add("pl-3");
    newButton.classList.add("pr-3");
    newButton.classList.add("pb-1");
    newButton.classList.add("pt-1");
    newButton.classList.add("w-full");
    newButton.classList.add("cursor-pointer");
    newButton.innerHTML = `
        <p class="text-amber-300 m-0 text-left">
            ${note.title}
        </p>
        <p class="text-amber-300/50 text-xs m-0 text-left">
            ${note.date}
        </p>
    `;
    sidebar.appendChild(newButton);
    newButton.addEventListener("click", function() {
        setNotesContent(index);
    });
}

for (let i = 0; i < content.length; i++) {
  addToSidebar(i);
}

// TODO: Allow for user note creation and deletion