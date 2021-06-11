import React from 'react'
import MuiAvatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import { motion } from 'framer-motion'
import { AnimateFadeIn } from '../utils/motion-variants'

const styles = {
    avatar: {
        width: 96,
        height: 96,
        margin: 'auto',
        marginLeft: '5px',
        border: '8px #f7f2f2 solid',
        borderBottom: '24px #f7f2f2 solid',
        borderRadius: 3,
        // '&>img': {
        //     borderRadius: 3,
        // },
    },
}

const AvatarView = ({ src, variant, email, ...props }) => {
    return (
        <motion.div
            positionTransition
            initial={AnimateFadeIn.initial}
            animate={AnimateFadeIn.animate}
            exit={AnimateFadeIn.exit}>
            <MuiAvatar
                className={props.className || props.classes.avatar}
                variant={variant || 'square'}
                src={src || `https://i.pravatar.cc/128?u=${email}`}
            />
        </motion.div>
    )
}

const Avatar = withStyles(styles)(AvatarView)

export default Avatar
