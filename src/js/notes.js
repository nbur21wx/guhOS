var sidebar = document.querySelector("#sidebar");
var content = [
    {
        title: "Hey!",
        date: "08/24/2026 @ 4:14 AM",
        content: `<p>Hey! Thanks for checking out guhOS!</p>
        Suppose I should tell you a little bit about myself...
        `
    }
];

function setNotesContent(index) {
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