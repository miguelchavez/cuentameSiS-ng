import '../styles/global.css' // Para tailwindcss
import '../styles/fonts.css' // fuentes de google

import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '../createEmotionCache'

import { useState, useEffect } from 'react'
import { SnackbarProvider } from 'notistack'
import ThemeProvider from '../theme'
import theme from '../theme/temaLight'
import ScrollToTop from '../components/ScrollToTop'

import { Fuego, FuegoProvider } from 'swr-firestore-v9'

import initFirebase from '../utils/auth/initFirebase'
import { getFirebaseAuth, getFireApp, getFirebaseConfig } from '../utils/auth/initFirebase'

// Segunda BD de respaldo
import PouchDB from 'pouchdb'
//  pouchdb-browser causa error al hacer SSR, con dynamic import NO funciona: PouchDB is not a constructor
// import Authentication from 'pouchdb-authentication'
import PouchDBFind from 'pouchdb-find'
import { Provider } from 'use-pouchdb'

import { UserProvider } from '../context/user'
import Layout from '../components/layout'
// import { auth } from 'firebase-admin'

export default function MyApp(props) {
    // Client-side cache, shared for the whole session of the user in the browser.
    const clientSideEmotionCache = createEmotionCache()

    const { Component, emotionCache = clientSideEmotionCache, pageProps, router } = props
    const [locale, setLocale] = useState('esES')
    const [darkMode, setDarkMode] = useState(false) // default mode based on useDarkMode.
    const [tema, setTema] = useState(theme)
    const [userDb, setUserDb] = useState(new PouchDB('local'))

    const [titulo, setTitulo] = useState('Inscripciones Colegio Anáhuac')

    // Init Firebase
    initFirebase()
    const firebaseConfig = getFirebaseConfig()

    const fuego = new Fuego(firebaseConfig)

    // PouchDB.plugin(Authentication)
    PouchDB.plugin(PouchDBFind)

    // change theme when mode changes (via toggle on the Appbar)
    // useEffect(() => {
    //     setTema(darkMode ? temaDark : temaLight)
    // }, [darkMode])

    // useEffect(() => {
    //     if (user && user.id) {
    //         console.log('* userDb:', user.id)
    //         setUserDb(new PouchDB(user.id))
    //     }
    // }, [user])

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>
            <Provider databases={{ userDb }} default='userDb'>
                <FuegoProvider fuego={fuego}>
                    <UserProvider>
                        <ThemeProvider theme={tema}>
                            <CssBaseline />
                            <ScrollToTop />
                            <SnackbarProvider maxSnack={6}>
                                {!router.pathname.startsWith('/signin') ? (
                                    <Layout darkMode={darkMode} setDarkMode={setDarkMode} titulo={titulo}>
                                        <Component
                                            {...pageProps}
                                            key={router.route}
                                            tema={tema}
                                            darkMode={darkMode}
                                            setDarkMode={setDarkMode}
                                            setTitulo={setTitulo}
                                        />
                                    </Layout>
                                ) : (
                                    <Component
                                        {...pageProps}
                                        key={router.route}
                                        tema={tema}
                                        darkMode={darkMode}
                                        setDarkMode={setDarkMode}
                                    />
                                )}
                            </SnackbarProvider>
                        </ThemeProvider>
                    </UserProvider>
                </FuegoProvider>
            </Provider>
        </CacheProvider>
    )
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
}
