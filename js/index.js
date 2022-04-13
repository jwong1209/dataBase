// TODO modify the config section with your firebase info
const firebaseConfig = {
  apiKey: "AIzaSyCSUEGMEL_VbKmSdYe2ay1ViiVg1ux_9uo",
  authDomain: "testdatabase-316f2.firebaseapp.com",
  projectId: "testdatabase-316f2",
  storageBucket: "testdatabase-316f2.appspot.com",
  messagingSenderId: "742662827036",
  appId: "1:742662827036:web:f87a10568dcb56746203d9",
  measurementId: "G-QZ33LZ695D"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// Get database reference
const database = firebase.database();

// login function
function login(event) {
    event.preventDefault();

    // read in email and password from input fields
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    // firebase authentication
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Error', error.message)
        alert(error.message)

    }).then(function(user) {
        if(user) {
            alert('Welcome back')
        }
    });
}

// logout function
function logout(event) {
    event.preventDefault();

    firebase.auth().signOut().then(() => {
        alert('Successfully signed out')
      }).catch((error) => {
        alert('Error!')
      });
}

function nextUser(event) {
    event.preventDefault();
    loadUser();
}

function loadUser() {
    var usersRef = firebase.database().ref('users/');
    usersRef.on('value', (snapshot) => {
        // find random user
        let index = Math.floor(Math.random() * snapshot.numChildren());
        var i = 0;
        var thisChild;

        snapshot.forEach(function(child) {
            if(i == index) {
                thisChild = child;
            }
            i++;
        })

        // get user details
        let name = thisChild.child("name").val();
        let distance = thisChild.child("distance").val();
        let age = thisChild.child("age").val();

        // update webpage
        document.getElementById('name').innerText = name;
        document.getElementById('distance').innerText = distance;
        document.getElementById('age').innerText = age;
    });
}

function addUser(event) {
    event.preventDefault();

    // read in data
    var name = document.getElementById('nameInput').value;
    var distance = document.getElementById('distanceInput').value;
    var age = document.getElementById('ageInput').value;

    // push to database
    database.ref('users/').push({
        name: name,
        distance: distance,
        age : age
    });    
}


firebase.auth().onAuthStateChanged(function(user) {
    var loggedIn = document.getElementById('loggedIn')
    var notLoggedIn = document.getElementById('notLoggedIn')
    if(user) {
        loadUser();
        loggedIn.style.display = 'blocked'
        notLoggedIn.style.display = 'none'

    } else {
        loggedIn.style.display = 'none'
        notLoggedIn.style.display = 'blocked' 
    }
});
