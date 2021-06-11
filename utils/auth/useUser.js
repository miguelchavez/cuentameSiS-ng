import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { removeUserCookie, setUserCookie, getUserFromCookie } from './userCookies'
import { mapUserData } from './mapUserData'

import { fuego } from '@nandorojo/swr-firestore'

const useUser = () => {
    const [user, setUser] = useState()
    const router = useRouter()

    const logout = () => {
        return fuego
            .auth()
            .signOut()
            .then(() => {
                // Sign-out successful.
                router.push('/signin')
            })
            .catch((e) => {
                console.error(e)
            })
    }

    useEffect(() => {
        // Firebase updates the id token every hour, this
        // makes sure the react state and the cookie are
        // both kept up to date
        console.log('iniciando useUser...')

        let unsubscribe = fuego.auth().onIdTokenChanged(async (user_) => {
            // Adds an observer for changes to the signed-in user's ID token, which includes sign-in, sign-out, and token refresh events.
            // This method has the same behavior as firebase.auth.Auth.onAuthStateChanged had prior to 4.0.0.
            console.log('On Id-Token-Changed...')
            if (user_) {
                const _user_ = await mapUserData(user_) //data coming from firebase auth. Este se va a la cookie
                console.log('Setting user cookie...')
                setUserCookie(_user_) // only needed data for the auth cookie
                setUser(_user_)
            } else {
                console.log('Removiendo cookie/user...')
                removeUserCookie()
                setUser()
            }
        })

        const userFromCookie = getUserFromCookie()
        if (!userFromCookie) {
            console.log('No USER from COOKIE:', userFromCookie)
            router.push('/signin')
            return
        }

        console.log('Setting user from cookie...')
        setUser(userFromCookie)

        // cleanup subscription
        return () => {
            console.log('Unsubscribe to Auth listener')
            unsubscribe && unsubscribe()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { user, logout }
}

export { useUser }
