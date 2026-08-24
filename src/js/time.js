function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.getElementById("timeElement");
    timeText.innerHTML = currentTime;
}

setInterval(updateTime, 1000)