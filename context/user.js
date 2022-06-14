// React
import React from 'react'
import { useEffect, useState } from 'react'

// NextJs
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

// Own
import { mapUserData } from '../utils/auth/mapUserData'

// Not used with firebase:
// import { removeUserCookie, setUserCookie, getUserFromCookie } from '../utils/auth/userCookies'

// https://firebase.google.com/docs/auth/web/google-signin
import initFirebase from '../utils/auth/initFirebase'
import { getFirebaseAuth, getFireApp, getFirebaseConfig, onAuthStateChanged, getUser, signOut } from '../utils/auth/initFirebase'

// react context
const UserStateContext = React.createContext()

export function UserProvider({ children }) {
    const [user, setUser] = React.useState(null)
    const router = useRouter()

    initFirebase()
    const firebaseConfig = getFirebaseConfig()
    const firebaseApp = getFireApp()
    const firebaseAuth = getFirebaseAuth()

    const logout = async () => {
        try {
            await signOut(firebaseAuth)
            // Sign-out successful.
            router.push('/signin')
        } catch (e) {
            console.error('[ UserProvider :: logout ] ERROR:', e)
        }
    }

    useEffect(() => {
        console.log('[ userProvider :: onUserChanged ] User:', user)
        if (user && user?.id) {
            console.log('User signed in...')
            if (router.route == '/signin') {
                router.push('/')
            }
        } else {
            if (router.route != '/signin') {
                router.push('/signin')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    useEffect(() => {
        // Firebase updates the id token every hour, this
        // makes sure the react state and the cookie are
        // both kept up to date
        console.log('iniciando useUser...')

        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                console.log('[ userProvider :: onAuthStateChanged ] User:', user)
                mapUserData(user)
                    .then((_user) => {
                        setUser(_user)
                        console.log('[ userProvider :: onAuthStateChanged :: mapUserData ] USER:', _user)
                    }) //data coming from firebase auth. Este se va a la cookie
                    .catch((err) => {
                        setUser()
                        console.log('[ userProvider :: onAuthStateChanged :: mapUserData ] ERROR:', err)
                    })
            } else {
                console.log('[ initFirebase :: onAuthStateChanged ] NO USER')
            }
        })

        // cleanup subscription
        return () => {
            console.log('Unsubscribe to Auth listener')
            unsubscribe && unsubscribe()
        }
        // cleanup subscription

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const state = {
        user,
        logout,
    }

    return <UserStateContext.Provider value={state}>{children}</UserStateContext.Provider>
}

export function useUserState() {
    const state = React.useContext(UserStateContext)

    if (state === undefined) {
        throw new Error('useUserState must be used within a UserProvider')
    }

    return state
}
