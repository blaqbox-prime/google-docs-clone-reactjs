import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyCNSsgeUeyZax9-acpm89IDUivpAeanO9c",
    authDomain: "auth-docs-dev.firebaseapp.com",
    projectId: "auth-docs-dev",
    storageBucket: "auth-docs-dev.appspot.com",
    messagingSenderId: "115264519283",
    appId: "1:115264519283:web:1e96f8da3f076448c4fe06"
})

export const auth = app.auth()
export default app