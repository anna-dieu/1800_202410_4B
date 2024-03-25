let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let int = null;

document.getElementById("start-timer").addEventListener("click", () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
});

document.getElementById("pause-timer").addEventListener("click", () => {
    clearInterval(int);
});

document.getElementById("reset-timer").addEventListener("click", () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.innerHTML = "00 : 00 : 00 : 000";
});

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
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10
        ? "00" + milliseconds
        : milliseconds < 100
            ? "0" + milliseconds
            : milliseconds;

    timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}

document.getElementById("pause-timer").addEventListener("click", () => {
    clearInterval(int);
});

//  make sure currentUser is logged in
var currentUser;

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
                } else {
            console.log("No user is signed in");
        }
    });
}

// Call populateUserInfo to initialize currentUser
populateUserInfo();

// Function to save timer data
function saveUserInfo(timerValue) {
    if (!currentUser) {
        console.error("Current user not available");
        return;
    }

    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; 
    var day = currentDate.getDate();
    var weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay()); 

    var dailyDocPath = `users/${currentUser.id}/timer/daily/${year}-${month}-${day}`;
    var weeklyDocPath = `users/${currentUser.id}/timer/weekly/${year}-${month}-${weekStart.getDate()}-to-${day}`;
    var monthlyDocPath = `users/${currentUser.id}/timer/monthly/${year}-${month}`;

    var batch = db.batch();
    batch.set(db.doc(dailyDocPath), { timerValue: timerValue }, { merge: true });
    batch.set(db.doc(weeklyDocPath), { timerValue: timerValue }, { merge: true });
    batch.set(db.doc(monthlyDocPath), { timerValue: timerValue }, { merge: true });

    batch.commit()
        .then(() => {
            console.log("Timer data saved successfully!");
            alert("Timer data saved successfully!"); // success
        })
        .catch(error => {
            console.error("Error saving timer data:", error);
            alert("Error saving timer data: " + error.message); // error
        });
}

// Event listener for saving timer data
document.getElementById("save-timer").addEventListener("click", () => {
    let formattedTime = timeRef.innerHTML.trim();
    saveUserInfo(formattedTime); 
});
