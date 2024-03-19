var taskDocID = localStorage.getItem("taskDocID");    //visible to all functions on this page

function getTaskName(id) {
    db.collection("tasks")
      .doc(id)
      .get()
      .then((thisHike) => {
        var hikeName = thisHike.data().name;
        document.getElementById("taskName").innerHTML = hikeName;
          });
}

function saveTaskDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('taskDocID', ID);
    window.location.href = 'edit.html';
}

function editTask() {
    let taskTitle = document.getElementById("title").value;
    let dueDate = document.getElementById("dueDate").value;
    let notes = document.getElementById("notes").value;

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("tasks").add({
            taskDocID: taskDocID,
            userID: userID,
            title: hikeTitle,
            dueDate: hikeLevel,
            notes: hikeSeason,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "tasks.html"; // Redirect to the thanks page
        });
    }
}