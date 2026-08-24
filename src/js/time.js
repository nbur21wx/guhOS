// time.js
// This is pretty easy to explain, it simply just handles the time shown on the topbar
// This project was made for HackClub's Stardance Challenge.
// nbur21wx

function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.getElementById("timeElement");
    timeText.innerHTML = currentTime;
}

setInterval(updateTime, 1000)