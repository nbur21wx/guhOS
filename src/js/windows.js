// windows.js
// This is where all of the windows are handled, it's a mess, but it works. (somehow)
// This project was made for HackClub's Stardance Challenge.
// nbur21wx

var biggestIndex = 1;
var topBar = document.querySelector("#top");

function dragElement(element) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header").onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();

        if (!element.dataset.dragInitialized) {
            var rect = element.getBoundingClientRect();
            var parentRect = element.offsetParent ? element.offsetParent.getBoundingClientRect() : { top: 0, left: 0 };
            element.classList.remove("top-1/2", "left-1/2", "-translate-x-1/2", "-translate-y-1/2");
            element.style.top = (rect.top - parentRect.top) + "px";
            element.style.left = (rect.left - parentRect.left) + "px";
            element.dataset.dragInitialized = "true";
        }

        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;
    }

    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        var newTop = element.offsetTop - currentY;
        var minTop = topBar.offsetHeight;
        element.style.top = Math.max(newTop, minTop) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function closeWindow(element) {
    element.classList.remove("animate-window-open");
    element.classList.add("animate-window-close");
    setTimeout(function() {
        element.classList.add("hidden");
        element.classList.remove("animate-window-close");
    }, 150);
    
}

function openWindow(element) {
    element.classList.remove("hidden");
    element.classList.add("animate-window-open");
    biggestIndex++;
    topBar.style.zIndex = biggestIndex + 100;
    element.style.zIndex = biggestIndex;
    topBar.classList.add("hidden");
    topBar.classList.remove("hidden");
}

function makeClosable(elementName) {
    var window = document.querySelector("#" + elementName);
    var closeButton = document.querySelector("#" + elementName + "close");
    closeButton.addEventListener("click", () => closeWindow(window));
}

function addWindowClickHandling(element) {
    element.addEventListener("mousedown", function() {
        biggestIndex++;
        topBar.style.zIndex = biggestIndex + 100;
        element.style.zIndex = biggestIndex;
        topBar.classList.add("hidden");
        topBar.classList.remove("hidden");
    });
}

function initializeWindow(elementName) {
    var screen = document.querySelector("#" + elementName);
    addWindowClickHandling(screen);
    makeClosable(elementName);
    dragElement(screen);
    var openElement = document.querySelector("#" + elementName + "open");
    openElement.addEventListener("click", function() {
        openWindow(screen);
    });
}

initializeWindow("welcome");
initializeWindow("notes");