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

    // change theme when mode changes (via toggle on the Appbar)
    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            console.log('DARK MODE @BROWSER prefers-color-scheme:dark')
            // PREFERIMOS DARK MODE de noche.
            // TODO: Implementar un setting para preferir a lo que me marca el browser (si es de noche)
            // if (!darkMode) {
            //     console.log('ES DE NOCHE! darkMode!')
            //     setTema(temaDark)
            //     setDarkMode(true)
            // }
        }
        console.log('darkMode Changed to:', darkMode)
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
                        />
                    </SnackbarProvider>
                </ThemeProvider>
            </FuegoProvider>
        </>
    )
}
