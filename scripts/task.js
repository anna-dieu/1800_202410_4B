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

getTaskName(taskDocID);

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


	
    db.collection("tasks").add({
        task: taskName,
        priority: taskPriority,
        deadline: taskDeadline,
    })
	
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

    
   
});

taskList.addEventListener("click", (event) => {
	if (event.target.classList.contains("mark-done")) {
		const taskItem = event.target.parentElement;
		taskItem.classList.add("completedTasks");
	taskItem.innerHTML = `
	<p>${task}</p>
	<p>Priority: ${priority}</p>
	<p>Deadline: ${deadline}</p>`;
		taskItem.style.display = 'none';
	}

});

var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
       
    db.collection("tasks").add({
        task: taskName,
        priority: taskPriority,
        deadline: taskDeadline,
    })
    }

	function displayTaskInfo() {
		let params = new URL( window.location.href ); //get URL of search bar
		let ID = params.searchParams.get( "docID" ); //get value for key "id"
		console.log( ID );
	
		// doublecheck: is your collection called "Reviews" or "reviews"?
		db.collection( "tasks" )
			.doc( ID )
			.get()
			.then( doc => {
				thisHike = doc.data();
				taskCode = thisTask.code;
				taskName = doc.data().name;
				
				// only populate title, and image
				document.getElementById( "task-list" ).innerHTML = taskName;
			} );
	}
	displayHikeInfo();

	
function showTasks() {
    console.log("test");
    let taskList = document.getElementById("task-list");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let hikeID = params.searchParams.get("docID");

    // Double-check: is your collection called "Reviews" or "reviews"?
    db.collection("tasks")
        .where("taskDocID", "==", taskID)
        .get()
        .then((allTasks) => {
            tasks = allTasks.docs;
            console.log(tasks);
            reviews.forEach((doc) => {
                var task = doc.data().task;
                var priority = doc.data().priority;
                var deadline = doc.data().deadline;
               
                let taskList = task-list.content.cloneNode(true);
                taskList.querySelector(".task").innerHTML = `task: ${task}`;
                taskList.querySelector(".priority").innerHTML = `priority: ${priority}`;
                taskList.querySelector(".deadline").innerHTML = `deadline: ${deadline}`;

                taskList.appendChild(taskList);
            });
        });
}

showTasks();