fetch('/python_function')
    .then(response => response.json())
    .then(data => {
        console.log(data.result); // Output: "Hello from Python!"
    })
    .catch(error => {
        console.error('Error:', error);
    });

var alarmString = null;

const alarmAudio = document.getElementById("alarm-audio");


const createAlarm = document.querySelector(".create-alarm");

const activeAlarm = document.getElementById("active-alarm");
const clearAlarm = document.getElementById("clear-alarm");
const stopbt=document.getElementById("stop-alarm");

const alarmTextContainer = document.getElementById("alarm-text");

const alarmText = (time) => `Alarm set at time ${time}`;

// Initialize alarm sound
alarmAudio.src = "http://soundbible.com/grab.php?id=1252&type=mp3";
alarmAudio.load();

// Handle Create Alarm submit
const handleSubmit = (event) => {
  // Prevent default action of reloading the page
  event.preventDefault();
  const { hour, sec, min, zone } = document.forms[0];
  alarmString = getTimeString({
    hours: hour.value,
    seconds: sec.value,
    minutes: min.value,
    zone: zone.value
  });
  // Reset form after submit
  document.forms[0].reset();
  // Hide create alarm
  createAlarm.style.display = "none";
  // show active alarm with text
  activeAlarm.style.display = "block";
  alarmTextContainer.innerHTML = alarmText(alarmString);
};

const handleClear = () => {
  alarmString = "";
  activeAlarm.style.display = "none";
  createAlarm.style.display = "block";
  alarmAudio.pause();
  
};


clearAlarm.addEventListener("click", function(){
    fetch('/python_function')
    .then(response => response.json())
    .then(data => {
        console.log(data.result); // Output: "Hello from Python!"
    })
    .catch(error => {
        console.error('Error:', error);
    });
    handleClear();
});

document.forms[0].addEventListener("submit", handleSubmit);


const checkAlarm = (timeString) => {
  if (alarmString === timeString) {
    alarmAudio.play();
    alarmAudio.loop = true;
    };
};

document.getElementById("stop-alarm").addEventListener("click", () => {
  alarmAudio.pause();
});

//time in string
const getTimeString = ({ hours, minutes, seconds, zone }) => {
  if (minutes / 10 < 1) {
    minutes = "0" + minutes;
  }
  if (seconds / 10 < 1) {
    seconds = "0" + seconds;
  }
  return `${hours}:${minutes}:${seconds} ${zone}`;
};

// Function to display current time on screen
const renderTime = () => {
  var currentTime = document.getElementById("current-time");
  const currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var zone = hours >= 12 ? "PM" : "AM";
  if (hours > 12) {
    hours = hours % 12;
  }
  const timeString = getTimeString({ hours, minutes, seconds, zone });
  checkAlarm(timeString);
  currentTime.innerHTML = timeString;
};

// Update time every second
setInterval(renderTime, 1000);