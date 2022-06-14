import { useEffect, useState } from 'react'

import {
    getAuth,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from '@firebase/auth'
import { getApp, getApps, initializeApp } from '@firebase/app'
import { getFirestore, enableIndexedDbPersistence, Firestore } from '@firebase/firestore'

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const state = {
    db: null,
    auth: null,
    fireApp: null,
    user: null,
}

export default function initFirebase() {
    let unsubscribe = null

    useEffect(() => {
        console.log('[ initFirebase :: onUser ] User:', state.user)
    }, [state.user])

    if (!getApps().length && state.db == null) {
        console.log('[ initFirebase ] Inicializando firebae...')

        state.fireApp = initializeApp(config)
        state.db = getFirestore(state.fireApp)
        state.auth = getAuth(state.fireApp)

        state.auth.languageCode = 'es'
        // instalamos observadores de estado de autenticacion
        const unsubscribe = onAuthStateChanged(state.auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                console.log('[ initFirebase :: onAuthStateChanged ] User:', user)
                state.user = user
            } else {
                console.log('[ initFirebase :: onAuthStateChanged ] NO USER')
            }
        })

        // establecemos persistencia de autenticacion
        // browserLocalPersistence / browserSessionPersistence

        // browserSessionPersistance: Solo para el tab actual, si se cierra se pierde la autenticacion, puede haber dif usuarios en cada tab del browser. Persiste entre page RELOADS
        // browserLocalPersistence: Sesion guardada en el browser, no solo en un tab. En cada tab, estara el mismo usuario. Se debe hacer 'logout' para borrar la sesion.
        // inMemoryPersistence: Solo persiste mientras no se haga reload de pagina.
        // Lo mejor: browserLocal... porque podemos tener varios usuarios en diferentes tabs para pruebas/trabajo. Y es mas seguro, al cerrar tab/browser se desautentica.

        setPersistence(state.auth, browserSessionPersistence)
            .then(() => {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                console.log('[ initFirebase :: Auth Presistence ] Ok, Persistence enabled!')

                // return signInWithEmailAndPassword(auth, email, password)
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                console.log('[ initFirebase :: Auth Presistence ] Error:', error.message)
            })

        // Habilitamos persistencia de datos de firestore
        // https://firebase.google.com/docs/firestore/manage-data/enable-offline
        enableIndexedDbPersistence(state.db).catch((err) => {
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
                console.log('[ initFirebase :: Db persistance failed-precondition! ]')
            } else if (err.code == 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
                console.log('[ initFirebase :: Db persistance unavailable in this browser! ]')
            }
        })
    } else {
        console.log('[ initFirebase :: Firebase Apps ready ]')
        state.fireApp = initializeApp(config)
        state.db = getFirestore(state.fireApp)
        state.auth = getAuth(state.fireApp)
    }

    // console.log('firestore:', state.db)
    // console.log('firebaseAuth:', state.auth)

    // cleanup subscription
    return () => {
        console.log('Unsubscribe to Auth listener')
        unsubscribe && unsubscribe()
    }
}

const getFirebaseAuth = (props) => {
    return state.auth
}

const getFirebaseFirestore = (props) => {
    return state.db
}

const getFireApp = (props) => {
    return state.fireApp
}

const getFirebaseConfig = (props) => {
    return config
}

const getUser = () => {
    return state.user
}

export {
    getFirebaseFirestore,
    getFirebaseAuth,
    getFireApp,
    getFirebaseConfig,
    getUser,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
}
