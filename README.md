# TriDev Firebase Workshop 2

Today, we'll go over how to set up a Firebase database and how to implement login, read, and write logic.


## Creating the Firebase project
1. Navigate to https://firebase.google.com/. Click on `get started` and then click `Add project`.
2. Select all the default settings until your project is created. That's it!

## Connecting Firebase to the website
1. Clone this repository if you haven't already. You'll notice that there are only two files.

    `index.html` contains the all the basic html code to generate a login screen and home screen.
    
    `index.js` contains useful functions required to log a user in, filter through other users, and add new users.
    
        login() - called when the user presses the submit button. Attempts to log in the user through Firebase Authentication.
        logout() - called when the user presses the logout button. Attempts to log out the user through Firebase Authentication.
        nextUser() - switches which user is shown on the home page when the user presses the next button, similar to a Tinder swipe left/right feature.
        loadUser() - helper function for nextUser().
        addUser() - adds a new user to the Firebase Realtime Database.
2. On your Firbase project console, select Web (</>) under **Get started by adding Firebase to your app**.
3. Give your web-app a nickname. Click register app.
4. In your `index.js`, replace the firebaseConfig constant with the one shown in Firebase. It should look something like:
    ~~~
    const firebaseConfig = {
      apiKey: "AIzaSyDawNeXEDmbVG0mtTyDTwHecmtbXRk3N8I",
      authDomain: "tester-1b4ea.firebaseapp.com",
      projectId: "tester-1b4ea",
      storageBucket: "tester-1b4ea.appspot.com",
      messagingSenderId: "728814399378",
      appId: "1:728814399378:web:daf3324dc5521b102b9b4b",
      measurementId: "G-79MWSF5586"
    };
    ~~~
5. In the terminal of your project, run
    ~~~
    curl -sL https://firebase.tools | bash
    ~~~
   This will set up firebase tools.
6. Run the following to login. It may redirect you to a browser.
    ~~~
    firebase login
    ~~~
7. Finally, run the following and select the option for Realtime Database and then select your Firebase project.
    ~~~
    firebase init
    ~~~
   It'll ask you if you want to set up your Realtime Database, say Yes. Then select us-central1 as the region. 
   Your workspace and Firebase are now connected!
   
## Creating a Realtime Database
1. Navigate to Realtime Database in the Firebase console. 
2. Click *Create Database*.
3. Select test mode. Our database is now created! You'll see that it is currently empty.
4. Lastly, copy the database url. Add a key-value pair to you firebaseConfig constant in `index.js` where databaseURL is the key and the url is the value. It should now look like
    ~~~
    const firebaseConfig = {
      apiKey: "AIzaSyDawNeXEDmbVG0mtTyDTwHecmtbXRk3N8I",
      authDomain: "tester-1b4ea.firebaseapp.com",
      projectId: "tester-1b4ea",
      storageBucket: "tester-1b4ea.appspot.com",
      messagingSenderId: "728814399378",
      appId: "1:728814399378:web:daf3324dc5521b102b9b4b",
      measurementId: "G-79MWSF5586",
      databaseURL: "https://fir-64a20-default-rtdb.firebaseio.com/"  
    };
    ~~~
   This ensures that we can access the database from our java-script code.
## Adding an Authentication User
1. We should now be able to open the `index.html` file in our favorite browser. The last step is to add a user for authentication so that we can log in. Normally, your website or app would have
   a sign-up page. To change things up, we'll add a user through the Authentication tab on Firebase.
2. Navigate to the **Authentication** tab and select **Get Started**.
3. You'll see that there are a variety of ways to implement login but we'll keep it simple. Select **Email/Password**.
4. Hit the Enable toggle and save.
5. Navigate to the **Users** tab and add a new user. You'll use this email/password combo to sign in.
6. Go back to our Firebase Social website and you should now be able to sign in!

## Adding to our Realtime Database
1. Once logged in, you'll notice that our User details section is empty. That's because we have no users in our database to scroll through. One way of adding users is
   to import a json file into the Database on the Firebase console. In our case, let's make use of the input field at the bottom to start filling up our database.
2. Once you add users, you'll notice that the **Next** button begins to work. You'll also notice that our Database on the Firebase console is being updated with our new users. Wow!


## Conclusion
That's the basic rundown of how to set up a database and connect it with a web-app. Firebase also has Android and IOS compatibility. Even if your team chooses not to go
with a Firebase database, take a look at the code as you'll most likely be implementing something similar within your project.

      
   

        

