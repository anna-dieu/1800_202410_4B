var currentUser; // Points to the document of the user who is logged in

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Go to the correct user document by referencing the user uid
            currentUser = db.collection("users").doc(user.uid);
            // Get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    // Get the data fields of the user
                    let userName = userDoc.data().name;
                    let userSchool = userDoc.data().school;
                    let userCity = userDoc.data().city;

                    // If the data fields are not empty, then write them into the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                });
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

// Call the function to run it
populateUserInfo();

function editUserInfo() {
    // Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    // Get user entered values
    var userName = document.getElementById('nameInput').value;
    var userSchool = document.getElementById('schoolInput').value;
    var userCity = document.getElementById('cityInput').value;
    var newPassword = document.getElementById('newPasswordInput').value;
    var confirmPassword = document.getElementById('confirmPasswordInput').value;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Update user's document in Firestore
    currentUser.update({
            name: userName,
            school: userSchool,
            city: userCity
        })
        .then(() => {
            console.log("Document successfully updated!");

            // Change password if new password is provided
            if (newPassword) {
                // Get current user
                var user = firebase.auth().currentUser;

                // Update password
                user.updatePassword(newPassword).then(function() {
                    // Password updated successfully
                    console.log("Password updated successfully!");
                    alert("Password updated successfully!");
                }).catch(function(error) {
                    // An error occurred while updating the password
                    console.error("Error updating password:", error);
                    alert("Error updating password: " + error.message);
                });
            }
        })
        .catch(function(error) {
            // An error occurred while updating user document
            console.error("Error updating document: ", error);
            alert("Error updating document: " + error.message);
        });

    // Disable edit
    document.getElementById('personalInfoFields').disabled = true;
}




