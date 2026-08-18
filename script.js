dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("grasswindow"));
dragElement(document.getElementById("calculatorwindow"));
dragElement(document.getElementById("timerwindow"));

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
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }
    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}   
var welcomeScreen = document.querySelector("#welcome");
function closeWindow(element){
    element.style.display = "none"

}
function openWindow(element){
    element.style.display = "flex"
}
var welcomeScreenClose = document.querySelector("#welcomeclose")
var welcomeScreenOpen = document.querySelector("#welcomeopen")
welcomeScreenClose.addEventListener("click", function(){
    closeWindow(welcomeScreen);
});
welcomeScreenOpen.addEventListener("click", function(){
    openWindow(welcomeScreen);
});

// Grass window functionality
var grassWindow = document.querySelector("#grasswindow");
var grassScreenClose = document.querySelector("#grassclose");
var grassScreenOpen = document.querySelector("#grassopen");
var grassArea = document.querySelector("#grassarea");
var cursorHand = document.querySelector("#cursor-hand");

grassScreenClose.addEventListener("click", function(){
    closeWindow(grassWindow);
});

grassScreenOpen.addEventListener("click", function(){
    openWindow(grassWindow);
});

// Cursor hand tracking
document.addEventListener("mousemove", function(e) {
    var grassRect = grassArea.getBoundingClientRect();
    if (grassWindow.style.display === "flex" && 
        e.clientX >= grassRect.left && e.clientX <= grassRect.right &&
        e.clientY >= grassRect.top && e.clientY <= grassRect.bottom) {
        cursorHand.style.display = "block";
        cursorHand.style.left = e.clientX + "px";
        cursorHand.style.top = e.clientY + "px";
    } else {
        cursorHand.style.display = "none";
    }
});

// Ripple effect on grass click
grassArea.addEventListener("click", function(e) {
    var rect = grassArea.getBoundingClientRect();
    var ripple = document.createElement("span");
    ripple.classList.add("ripple");
    
    var size = Math.max(rect.width, rect.height);
    var x = e.clientX - rect.left - size / 2;
    var y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    
    grassArea.appendChild(ripple);
    
    setTimeout(function() {
        ripple.remove();
    }, 600);
});
var selectedIcon = undefined;

// Calculator functionality
var calculatorWindow = document.querySelector("#calculatorwindow");
var calculatorScreenClose = document.querySelector("#calculatorclose");
var calculatorScreenOpen = document.querySelector("#calculatoropen");
var calcDisplay = document.querySelector("#calcDisplay");

calculatorScreenClose.addEventListener("click", function(){
    closeWindow(calculatorWindow);
});

calculatorScreenOpen.addEventListener("click", function(){
    openWindow(calculatorWindow);
});

function calcAppend(value) {
    if (calcDisplay.value === "0" && value !== ".") {
        calcDisplay.value = value;
    } else {
        calcDisplay.value += value;
    }
}

function calcClear() {
    calcDisplay.value = "0";
}

function calcEquals() {
    try {
        calcDisplay.value = eval(calcDisplay.value);
    } catch(e) {
        calcDisplay.value = "Error";
    }
}

// Timer functionality
var timerWindow = document.querySelector("#timerwindow");
var timerScreenClose = document.querySelector("#timerclose");
var timerScreenOpen = document.querySelector("#timeropen");
var timerDisplay = document.querySelector("#timerDisplay");
var timerHoursInput = document.querySelector("#timerHours");
var timerMinutesInput = document.querySelector("#timerMinutes");
var timerSecondsInput = document.querySelector("#timerSeconds");
var timerInterval = null;
var timerRunning = false;
var totalSeconds = 0;

timerScreenClose.addEventListener("click", function(){
    closeWindow(timerWindow);
    if (timerRunning) timerPause();
});

timerScreenOpen.addEventListener("click", function(){
    openWindow(timerWindow);
});

// Prevent dragging when interacting with timer inputs
timerHoursInput.addEventListener("mousedown", function(e) {
    e.stopPropagation();
});
timerMinutesInput.addEventListener("mousedown", function(e) {
    e.stopPropagation();
});
timerSecondsInput.addEventListener("mousedown", function(e) {
    e.stopPropagation();
});

// Allow keyboard input
timerHoursInput.addEventListener("keydown", function(e) {
    e.stopPropagation();
});
timerMinutesInput.addEventListener("keydown", function(e) {
    e.stopPropagation();
});
timerSecondsInput.addEventListener("keydown", function(e) {
    e.stopPropagation();
});

function timerSet() {
    var hours = parseInt(timerHoursInput.value) || 0;
    var minutes = parseInt(timerMinutesInput.value) || 0;
    var seconds = parseInt(timerSecondsInput.value) || 0;
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    updateTimerDisplay();
}

function timerStart() {
    if (timerRunning) return;
    timerRunning = true;
    timerInterval = setInterval(function() {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimerDisplay();
        } else {
            timerPause();
            alert("Timer finished!");
        }
    }, 1000);
}

function timerPause() {
    timerRunning = false;
    if (timerInterval) clearInterval(timerInterval);
}

function timerReset() {
    timerPause();
    totalSeconds = 0;
    document.querySelector("#timerHours").value = "0";
    document.querySelector("#timerMinutes").value = "0";
    document.querySelector("#timerSeconds").value = "0";
    updateTimerDisplay();
}

function updateTimerDisplay() {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    timerDisplay.textContent = 
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;
}