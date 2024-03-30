var taskDocID = localStorage.getItem("taskDocID");    //visible to all functions on this page

function getTaskName(id) {
    db.collection("tasks")
      .doc(id)
      .get()
      .then((taskName) => {
        var taskName = thisHike.data().name;
        document.getElementById("task").innerHTML = task;
          });
}

// function saveTaskDocumentIDAndRedirect(){
//     let params = new URL(window.location.href) //get the url from the search bar
//     let ID = params.searchParams.get("docID");
//     localStorage.setItem('taskDocID', ID);
//     window.location.href = 'edit.html';
// }

// function editTask() {
//     let taskTitle = document.getElementById("title").value;
//     let dueDate = document.getElementById("dueDate").value;
//     let notes = document.getElementById("notes").value;

//     var user = firebase.auth().currentUser;
//     if (user) {
//         var currentUser = db.collection("users").doc(user.uid);
//         var userID = user.uid;

//         // Get the document for the current user.
//         db.collection("tasks").add({
//             taskDocID: taskDocID,
//             userID: userID,
//             title: hikeTitle,
//             dueDate: hikeLevel,
//             notes: hikeSeason,
//             timestamp: firebase.firestore.FieldValue.serverTimestamp()
//         }).then(() => {
//             window.location.href = "tasks.html"; // Redirect to the thanks page
//         });
//     }
// }
var user = firebase.auth().currentUser;

const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", () => {
	const task = taskInput.value;
	const priority = priorityInput.value;
	const deadline = deadlineInput.value;
	if (task.trim() === "" || deadline === "") {
		alert("Please select an upcoming date for the deadline.")
		return; // Don't add task if task or deadline is empty
	}

    let taskName = document.getElementById("task").value;
    let taskPriority = document.getElementById("priority").value;
    let taskDeadline = document.getElementById("deadline").value;

	if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
	
    db.collection("tasks").add({
        task: taskName,
        priority: taskPriority,
        deadline: taskDeadline,
    })
	}
	const selectedDate = new Date(deadline);
	const currentDate = new Date();

	if (selectedDate <= currentDate) {
		alert("Please select an upcoming date for the deadline.");
		return; // Don't add task if deadline is not in the future
	}


	const taskItem = document.createElement("div");
	taskItem.classList.add("task");
	taskItem.innerHTML = `
	<p>${task}</p>
	<p>Priority: ${priority}</p>
	<p>Deadline: ${deadline}</p>
    <p><a href="timer.html">
    <img src="icons8-clock-30.png" height="17px" width="17px" alt="timer">
  </a></p>
	<button class="mark-done">Mark Done</button>
`;

	taskList.appendChild(taskItem);

	taskInput.value = "";
	priorityInput.value = "top";
	deadlineInput.value = "";

    let
   
});

taskList.addEventListener("click", (event) => {
	if (event.target.classList.contains("mark-done")) {
		const taskItem = event.target.parentElement;
		taskItem.style.backgroundColor = "#f2f2f2";
		event.target.disabled = true;
        // window.location.href = "starred.html"; 

        
	}
});
