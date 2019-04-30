import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyA7vbwCRyHHG4rZFJS7siIw7TzPjbNY2f4",
  authDomain: "dinder-a6dfa.firebaseapp.com",
  databaseURL: "https://dinder-a6dfa.firebaseio.com",
  projectId: "dinder-a6dfa",
  storageBucket: "dinder-a6dfa.appspot.com",
  messagingSenderId: "241042837277"
};

firebase.initializeApp(config);

const db = firebase.database();

export const addData = data => db.ref("data/").push(data);
export const fetchData = db.ref("data/");
