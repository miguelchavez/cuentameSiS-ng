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
import { Fuego, FuegoProvider, useDocument } from '@nandorojo/swr-firestore'

import { useUser } from '../utils/auth/useUser'

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

    const { user, logout } = useUser()

    const userProfile = useDocument(user ? `usuarios/${user.id}` : null, {
        listen: false,
        ignoreFirestoreDocumentSnapshotField: false,
    })

    useEffect(() => {
        console.log('Layout >> Cambio en perfil: ', userProfile)
        if (userProfile.data) {
            // Solo deberia haber un resultado.
            if (userProfile.data.darkMode == 'Auto') {
                // Este tiene precedencia. Auto significa que se pone lo que dice el browser.
                console.log(
                    '<Auto> DEVICE Broser DarkMode enabled:',
                    window.matchMedia('(prefers-color-scheme: dark)').matches
                )
                setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
            } else {
                console.log('<User> Mode:', userProfile.data.darkMode)
                setDarkMode(userProfile.data.darkMode === 'D' ? true : false)
            }
        } else {
            console.log('Layout >> No userProfile')
        }
    }, [userProfile, darkMode])

    // change theme when mode changes (via toggle on the Appbar)
    useEffect(() => {
        console.log('darkMode Changed by the user to:', darkMode)
        setTema(darkMode ? temaDark : temaLight)
    }, [darkMode])

    return (
        <>
            <FuegoProvider fuego={fuego}>
                <ThemeProvider theme={tema}>
                    <SnackbarProvider maxSnack={6}>
                        <Component
                            {...pageProps}
                            key={router.route}
                            tema={tema}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            userProfile={userProfile}
                            authUser={user}
                            logout={logout}
                        />
                    </SnackbarProvider>
                </ThemeProvider>
            </FuegoProvider>
        </>
    )
}
