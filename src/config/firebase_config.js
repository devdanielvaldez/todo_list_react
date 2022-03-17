import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// firebase access credentials
const firebaseConfig = {
    apiKey: "AIzaSyCZkXg6Ul3n_FLQGmgpfmiJqfTA2KG8jt4",
    authDomain: "todo-list-dv.firebaseapp.com",
    projectId: "todo-list-dv",
    storageBucket: "todo-list-dv.appspot.com",
    messagingSenderId: "253352725492",
    appId: "1:253352725492:web:c1867230b115889bda07a1"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };