const timerValues = db.collection('timer');

var h;
var m;
var s;
var ms;

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let int = null;



document.getElementById("start-timer").addEventListener("click",
    () => {
        if (int !== null) {
            clearInterval(int);
        }
        int = setInterval(displayTimer, 10);
    });

document.getElementById("pause-timer").addEventListener("click",
    () => {
        clearInterval(int);
    })

document.getElementById("reset-timer").addEventListener("click",
    () => {
        clearInterval(int);
        [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
        timeRef.innerHTML = "00 : 00 : 00 : 000";
    });

document.getElementById("save-timer").addEventListener("click",
    () => {
        timerValues.add({
            hours: h,
            minutes: m,
            seconds: s,
            milliseconds: ms
        }).then(() => {
        console.log("data added");
        }).catch((e) =>{
            console.error("Failed to add time", e);
        });
    })

function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }
     h = hours < 10 ? "0" + hours : hours;
     m = minutes < 10 ? "0" + minutes : minutes;
 s = seconds < 10 ? "0" + seconds : seconds;
     ms =
        milliseconds < 10
            ? "00" + milliseconds
            : milliseconds < 100
                ? "0" + milliseconds
                : milliseconds;

    timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`; 
}

