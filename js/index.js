// TODO modify the config section with your firebase info
const firebaseConfig = {
    apiKey: "AIzaSyDwUpP6AQR8Mn0RbglCcN41T5sUpP8QAlc",
    authDomain: "fir-64a20.firebaseapp.com",
    databaseURL: "https://fir-64a20-default-rtdb.firebaseio.com/",
    projectId: "fir-64a20",
    storageBucket: "fir-64a20.appspot.com",
    messagingSenderId: "1069801915470",
    appId: "1:1069801915470:web:ab63bf899157193821ef1f",
    measurementId: "G-FWZ1J32J1W"
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