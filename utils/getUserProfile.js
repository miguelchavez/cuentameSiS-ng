import { db } from './auth/initFirebase'

export const getUserProfile = async (userId) => {
    // const db = firebase.firestore()
    return db
        .collection('perfiles')
        .doc(userId)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data()
                // const normalizedCreatedAt = new Intl.DateTimeFormat( "es-MX" ).format( date )
                // console.log('Uid:', data.id)
                return data
            } else {
                console.log('No such profile!')
            }
        })
        .catch(function (error) {
            console.log('Error getting document:', error)
        })
}
