import React from 'react'
import { Paper } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    footer: {
        background: 'rgba(0, 0, 0, 0.9)' /* fallback for old browsers */,
        background:
            '-webkit-linear-gradient(to right, rgba(15, 155, 15, 0.4), rgba(0, 0, 0, 0.8))',
        background:
            'linear-gradient(to right, rgba(15, 155, 15, 0.4), rgba(0, 0, 0, 0.8))',
        margin: '3.5rem 0',
        padding: '1.5rem 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#F3F3F3'
    },

    mail: {
        color: '#F3F3F3',
        textDecoration: 'underline',

        '&:hover': {
            color: '#932432'
        }
    }
}))

const Footer = () => {
    const classes = useStyles()
    return (
        <Paper className={classes.footer}>
            <p>&copy; Copyright 2021.</p>
            <p>
                All rights reserved. Made by{' '}
                <a
                    href='mailto:liviuandrei.dev@gmail.com'
                    className={classes.mail}
                >
                    OblivionLi
                </a>
                .
            </p>
        </Paper>
    )
}

export default Footer
