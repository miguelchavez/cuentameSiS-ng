import '../style/global.scss'

import { useState, useEffect } from 'react'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@material-ui/core/styles'
import { temaLight, temaDark } from '../style/temaCuentameApp'
import useDarkMode from 'use-dark-mode'
import React from 'react'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { Fuego, FuegoProvider } from '@nandorojo/swr-firestore'

// Segunda BD de respaldo
import PouchDB from 'pouchdb'
//  pouchdb-browser causa error al hacer SSR, con dynamic import NO funciona: PouchDB is not a constructor
// import Authentication from 'pouchdb-authentication'
import PouchDBFind from 'pouchdb-find'
import { Provider } from 'use-pouchdb'

// import { useUser } from '../utils/auth/useUser'
import { UserProvider } from '../context/user'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
}

const fuego = new Fuego(firebaseConfig)

export default function MyApp({ Component, pageProps, router }) {
    const [locale, setLocale] = useState('esES')
    const { value: isDark } = useDarkMode(true)
    const [darkMode, setDarkMode] = useState(isDark) // default mode based on useDarkMode.
    const [tema, setTema] = useState(temaLight)

    // PouchDB.plugin(Authentication)
    PouchDB.plugin(PouchDBFind)

    // const { user, logout } = useUser()
    const [userDb, setUserDb] = useState(new PouchDB('local'))

    // change theme when mode changes (via toggle on the Appbar)
    useEffect(() => {
        console.log('darkMode Changed by the user to:', darkMode)
        setTema(darkMode ? temaDark : temaLight)
    }, [darkMode])

    // useEffect(() => {
    //     if (user && user.id) {
    //         console.log('* userDb:', user.id)
    //         setUserDb(new PouchDB(user.id))
    //     }
    // }, [user])

    return (
        <>
            <Provider databases={{ userDb }} default='userDb'>
                <FuegoProvider fuego={fuego}>
                    <UserProvider>
                        <ThemeProvider theme={tema}>
                            <SnackbarProvider maxSnack={6}>
                                <Component
                                    {...pageProps}
                                    key={router.route}
                                    tema={tema}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                />
                            </SnackbarProvider>
                        </ThemeProvider>
                    </UserProvider>
                </FuegoProvider>
            </Provider>
        </>
    )
}
