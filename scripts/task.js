var taskDocID = localStorage.getItem("taskDocID");    //visible to all functions on this page

function getTaskName(id) {
    db.collection("tasks")
      .doc(id)
      .get()
      .then((thisTask) => {
        var taskName = thisTask.data().name;
        document.getElementById("task").innerHTML = taskName;
          });
}

getTaskName(taskDocID);


const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        
    db.collection("tasks").add({
        task: taskName,
        priority: taskPriority,
        deadline: taskDeadline,
    })
    console.log("complete");
    }

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
		// return; // Don't add task if deadline is not in the future
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

// Replace "auth.currentUser" with your actual user authentication method
const currentUser = auth.currentUser.uid; // Get current user ID
tasksRef
  .where("user", "==", currentUser)
  .onSnapshot((snapshot) => {
    const taskItems = snapshot.docChanges().map((change) => {
      const taskData = change.doc.data();
      // Create task item element (similar to your existing code)
      const taskItem = document.createElement("div");
      taskItem.classList.add("task");
    
      // Add user information within the task item (e.g., a label or link)
      taskItem.innerHTML += `<p>Added by: ${taskData.user}</p>`;
      return taskItem;
    });

    // Display tasks in the task div
    const taskList = document.getElementById("task-list"); // Assuming a container with ID "task-list"
    taskList.innerHTML = ""; // Clear existing tasks
    taskItems.forEach((taskItem) => taskList.appendChild(taskItem));
  });

// After adding the task to the database:
const taskData = {
    task: taskName,
    priority: taskPriority,
    deadline: deadline,
    user: currentUser // Assuming you have retrieved the current user ID
  };
  
  localStorage.setItem(taskId, JSON.stringify(taskData)); // Replace "taskId" with a unique identifier
  

    
   
});

window.onload = function() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear existing tasks
  
    // Loop through tasks in storage and create task items
    for (let i = 0; i < localStorage.length; i++) {
      const taskData = JSON.parse(localStorage.getItem(localStorage.key(i)));
      const taskItem = document.createElement("div");
      taskItem.classList.add("task");
      // ... (Create and populate task item based on taskData)
      taskList.appendChild(taskItem);
    }
  };
  


taskList.addEventListener("click", (event) => {
	if (event.target.classList.contains("mark-done")) {
    alert("Task Completed!!")
		const taskItem = event.target.parentElement;
		taskItem.classList.add("completedTasks");
	taskItem.innerHTML = `
	<p>${task}</p>
	<p>Priority: ${priority}</p>
	<p>Deadline: ${deadline}</p>`;
		taskItem.style.display = 'none';
	}

    let taskName = document.getElementById("task").value;
    let taskPriority = document.getElementById("priority").value;
    let taskDeadline = document.getElementById("deadline").value;
	
    db.collection("completedTasks").add({
        task: taskName,
        priority: taskPriority,
        deadline: taskDeadline,
    })
  });


















  
//----------------------------------------------------------
// This function takes input param User's Firestore document pointer
// and retrieves the "saved" array (of bookmarks) 
// and dynamically displays them in the gallery
//----------------------------------------------------------
// function getTasks(user) {
//     db.collection("users").doc(user.uid).get()
//         .then(userDoc => {

// 					  // Get the Array of bookmarks
//             var thetasks = userDoc.data().tasks;
//             console.log(tasks);
						
// 						// Get pointer the new card template
//             let newcardTemplate = document.getElementById("task-list");

// 						// Iterate through the ARRAY of bookmarked hikes (document ID's)
//             tasks.forEach(thisTaskID => {
//                 console.log(thisTaskID);
//                 db.collection("tasks").doc(thisTaskID).get().then(doc => {
//                     var title = doc.data().name; // get value of the "name" key
//                     var hikeCode = doc.data().code; //get unique ID to each hike to be used for fetching right image
//                     var hikeLength = doc.data().length; //gets the length field
//                     var docID = doc.id;  //this is the autogenerated ID of the document
                    
//                     //clone the new card 
//                     let newcard = newcardTemplate.content.cloneNode(true);

//                     //update title and some pertinant information
//                     newcard.querySelector('.card-title').innerHTML = title;
//                     newcard.querySelector('.card-length').innerHTML = hikeLength + "km";
//                     newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
//                     newcard.querySelector('a').href = "eachHike.html?docID=" + docID;

//                     //NEW LINE: update to display length, duration, last updated
//                     newcard.querySelector('.card-length').innerHTML =
//                         "Length: " + doc.data().length + " km <br>" +
//                         "Duration: " + doc.data().hike_time + "min <br>" +
//                         "Last updated: " + doc.data().last_updated.toDate().toLocaleDateString();

// 										//Finally, attach this new card to the gallery
//                     hikeCardGroup.appendChild(newcard);
//                 })
//             });
//         })
// }

// function showTasks() {
//     console.log("test");
//     let taskList = document.getElementById("task-list");

//     let params = new URL(window.location.href); // Get the URL from the search bar
//     let hikeID = params.searchParams.get("docID");

//     // Double-check: is your collection called "Reviews" or "reviews"?
//     db.collection("tasks")
//         .get()
//         .then((allTasks) => {
//             tasks = allTasks.docs;
//             console.log(tasks);
//             tasks.forEach((doc) => {
//                 var task = doc.data().task;
//                 var priority = doc.data().priority;
//                 var deadline = doc.data().deadline;
               
//                 let taskList = task.content.cloneNode(true);
//                 taskList.querySelector(".task").innerHTML = `task: ${task}`;
//                 taskList.querySelector(".priority").innerHTML = `priority: ${priority}`;
//                 taskList.querySelector(".deadline").innerHTML = `deadline: ${deadline}`;

//                 taskList.appendChild(taskList);
//             });
//         });
// }

// showTasks();