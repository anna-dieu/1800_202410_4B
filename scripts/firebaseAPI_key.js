//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyDvWEwy6R5BnYRQ8X3wgj46Fn4GL-kZmvo",
  authDomain: "screenaid-6bd5a.firebaseapp.com",
  projectId: "screenaid-6bd5a",
  storageBucket: "screenaid-6bd5a.appspot.com",
  messagingSenderId: "678711028474",
  appId: "1:678711028474:web:72bb63a313902ab82bb743"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
