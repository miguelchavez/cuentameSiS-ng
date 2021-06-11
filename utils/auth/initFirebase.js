import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
}

let db = null
let auth = null
let fireApp = null

export default function initFirebase() {
    if (!firebase.apps.length) {
        console.log('Iniciando firebase...')
        firebase.initializeApp(config)
        db = firebase.firestore()
        auth = firebase.auth()
        fireApp = firebase
        // https://firebase.google.com/docs/firestore/manage-data/enable-offline
        // En la Web, la persistencia sin conexión solo es compatible con los navegadores web Chrome, Firefox y Safari.
        db.enablePersistence()
            .then(() => {
                console.log('Ok, Persistence enabled!')
            })
            .catch((err) => {
                if (err.code == 'failed-precondition') {
                    // Multiple tabs open, persistence can only be enabled
                    // in one tab at a a time.
                    console.error('PRECONDITION FAILED: persistence can only be enabled in one tab at a time')
                } else if (err.code == 'unimplemented') {
                    // The current browser does not support all of the
                    // features required to enable persistence
                    console.error('BROWSER NOT SUPPORTED: persistence can only be enabled in Firefox, Chrome and Safari.')
                }
            })
    } else {
        db = auth = firebase.auth() // firebase.firestore()
        fireApp = firebase
    }

    //firebase.auth().languageCode = 'es';
}

export { db, auth, fireApp }
