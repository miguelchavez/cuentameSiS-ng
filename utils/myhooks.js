// https://stackoverflow.com/a/54159564
import React, { useRef } from 'react'

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus()
    }

    return [htmlElRef, setFocus]
}

export { useFocus }
