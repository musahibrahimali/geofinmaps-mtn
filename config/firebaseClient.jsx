import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC9os3p_kEdCqjHfPdOuV5m2vlouFtTU9g",
    authDomain: "roam-ghana.firebaseapp.com",
    databaseURL: "https://roam-ghana-default-rtdb.firebaseio.com",
    projectId: "roam-ghana",
    storageBucket: "roam-ghana.appspot.com",
    messagingSenderId: "404258353224",
    appId: "1:404258353224:web:af615ea43315b6d5ffa87d",
    measurementId: "G-11RZGJ7PWR"
};


const firebaseClient = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

export default firebaseClient;
