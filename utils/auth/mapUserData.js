export const mapUserData = async (user) => {
    // Esta funcion obtiene los datos del IdToken no del Perfil.
    // Estos datos se agregan cuando se crea el usuario.
    const { uid, email, photoURL, displayName } = user
    const token = await user.getIdToken(true)
    return {
        id: uid,
        email,
        token,
        avatar: photoURL,
        nombre: displayName,
    }
}
