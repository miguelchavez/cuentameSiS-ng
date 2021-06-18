/*
 * constants for motion.
 */

let easing = [0.6, -0.05, 0.01, 0.99]

export const FadeInUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.9, ease: easing },
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing,
        },
    },
}

export const AnimateUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.9, ease: easing },
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: easing },
    },
    exit: {
        y: -60,
        opacity: 0,
        transition: { duration: 0.9, ease: easing },
    },
}

export const AnimateFadeIn = {
    initial: {
        opacity: 0,
        transition: { duration: 2, ease: easing },
    },
    animate: {
        opacity: 1,
        transition: { duration: 2, ease: easing },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.9, ease: easing },
    },
}

export const AnimateScale = {
    initial: {
        y: 50,
        scale: 0.3,
        opacity: 0,
        transition: { duration: 0.6, ease: easing },
    },
    animate: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: 0.6, ease: easing, staggerChildren: 0.1 },
    },
    exit: {
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.6, ease: easing },
    },
}

export const Container_ = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5,
            delayChildren: 0.85,
        },
    },
}

export const Item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
}

export const Hover = {
    scale: 1.1,
    borderRadius: 12,
    boxShadow: '0 4px 6px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)',
}
