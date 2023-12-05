// firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Web app Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyA0oSHopKR9l0YgW_XbRA741L_3lHInY38",
    authDomain: "responsiveapp1.firebaseapp.com",
    projectId: "responsiveapp1",
    storageBucket: "responsiveapp1.appspot.com",
    messagingSenderId: "419964788515",
    appId: "1:419964788515:web:e8a0b094818c2889087696"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };