//start: npx create-react-app [name of app]
//open: code [name of app]
//npm install firebase react-firebase-hooks [get firebase and connect to backend]

// https://www.youtube.com/watch?v=zQyrwxMPm88
// https://www.youtube.com/watch?v=clJCDHml2cA

/*
https://colab.research.google.com/drive/1O-su4UAHBPusOUzyeJAPeogg4nBDXFhc
https://colab.research.google.com/drive/1GB7MniRq41bBEF5Ak5d2IHqvAmMWM_2q
https://colab.research.google.com/notebooks/snippets/sheets.ipynb#scrollTo=6d0xJz3VzLOo
https://colab.research.google.com/github/ljchang/dartbrains/blob/master/content/Download_Data.ipynb
*/

// Javascript/Typescript

import React from 'react';
import './App.css';

// Firebase initializing
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Hooks
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  //Copied from firebase after incorporting a web application
  apiKey: "AIzaSyAqvK48ZAFS2D6-iPOPJcWlb9W9xK6eZkk",
  authDomain: "chatapp-391fe.firebaseapp.com",
  projectId: "chatapp-391fe",
  storageBucket: "chatapp-391fe.firebasestorage.app",
  messagingSenderId: "836829962819",
  appId: "1:836829962819:web:7676adcd874dffcd89eaf6",
  measurementId: "G-X1HXYG82K5"
})

//Global Variables
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);
  //if signed in, user would be an object with information such as emails, user IDs etc.
  //if not signed in, user would be "null"
  //Use this to determine if the user logged in or not to trigger app behaviours

  return (
    <div className="App">
      <header className="App-header">

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
        {/*Essentially, if the user is signed in, it shows chatroom, or it just shows the sign in page*/}
        {/*Chatroom and SignIn are defined below*/}
      </section>

    </div>
  );
}

function SignIn(){
// The function returns a button that allows users to sign in with Google

//instantiate a provider within the "signInWithGoogle" function
const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
  //Pass the provider into the signInWithPopup method to get a popup window
}

  return (
    <button onClick={signInWithGoogle}> Sign In With Google </button>
    // When the function is clicked, the function named "signInWithGoogle" will be executed
  )
}

function SignOut(){
  // Check if the user is signed in to enable sign out
  return auth.currentUser && (
    <button onClick={() => auth.SignOut}>Sign Out</button>
  )
}

function ChatRoom(){

  // Make a reference to the message part in the fire base, and firestore.collection accomplishes that
  const messagesRef = firestore.collection('message');
  // Make a query for the subset of documents in a collection
  const query = messagesRef.orderBy('createdAt').limit(25);

  //Listen to the data with a hook called "useCollectionData"
  const [messages] = useCollectionData(query, {idField: 'id'}); //returns an array of objects that store the chat messages
  //React implements these changes in real time

  return (
    <>
    <div>
      {/*Map over the array of all messages and use the ChatMessage component with the key and message which passes in the documented data as the message prompt*/}
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
    </div>

    <div>


    </div>
    </>
  )
  
}

function ChatMessage(props){
  const { text, uid } = props.message;

  return <p>{text}</p>
}

export default App;
